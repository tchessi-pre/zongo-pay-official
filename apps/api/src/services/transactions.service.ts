import { Prisma } from '@prisma/client'
import { prisma } from '../db.js'
import type { CreatePayoutDto, SendTransactionDto } from '../dto/transactions.dto.js'
import {
  createFedapayCollect,
  createFedapayPayout,
  createFedapayTransactionToken,
  sendFedapayPayment
} from '../clients/fedapay.client.js'

function generateReference() {
  return `TX-${Date.now()}-${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0')}`
}

function extractFedapayIdentifiers(payload: unknown) {
  if (!payload || typeof payload !== 'object') {
    return { id: undefined as string | undefined, reference: undefined as string | undefined }
  }

  const root = payload as Record<string, unknown>

  const direct =
    'id' in root && (typeof root.id === 'string' || typeof root.id === 'number')
      ? (root as Record<string, unknown>)
      : null

  const nested =
    !direct && 'v1/transaction' in root && typeof root['v1/transaction'] === 'object'
      ? (root['v1/transaction'] as Record<string, unknown>)
      : null

  const tx = direct ?? nested

  if (!tx) {
    return { id: undefined as string | undefined, reference: undefined as string | undefined }
  }

  const rawId = tx.id as string | number | undefined
  const rawRef = tx.reference as string | undefined

  return {
    id: rawId != null ? String(rawId) : undefined,
    reference: typeof rawRef === 'string' ? rawRef : undefined
  }
}

export async function sendPayout(userId: string, data: CreatePayoutDto) {
  const user = await prisma.user.findUnique({
    where: { id: userId }
  })

  if (!user) {
    throw new Error('USER_NOT_FOUND')
  }

  const amountDecimal = new Prisma.Decimal(data.amount)

  const sourceWallet =
    data.source_wallet_id != null
      ? await prisma.wallet.findFirst({
        where: {
          id: data.source_wallet_id,
          userId
        }
      })
      : await prisma.wallet.findFirst({
        where: {
          userId
        },
        orderBy: {
          createdAt: 'asc'
        }
      })

  if (!sourceWallet) {
    throw new Error('SOURCE_WALLET_NOT_FOUND')
  }

  if (sourceWallet.balance.lt(amountDecimal)) {
    throw new Error('INSUFFICIENT_FUNDS')
  }

  const isPayoutMockEnabled = process.env.FEDAPAY_PAYOUTS_MOCK === 'true'
  console.log(`[Payout] Mock mode: ${isPayoutMockEnabled} (env: ${process.env.FEDAPAY_PAYOUTS_MOCK})`)

  const payoutInfo = isPayoutMockEnabled
    ? {
      id: undefined as string | undefined,
      reference: generateReference()
    }
    : await (async () => {
      try {
        // Split full name into first and last name
        const nameParts = user.fullName.trim().split(/\s+/)
        const lastname = nameParts.length > 1 ? nameParts.pop() : ''
        const firstname = nameParts.join(' ') || user.fullName

        const response = await createFedapayPayout({
          amount: data.amount,
          currency: sourceWallet.currency,
          customerPhone: data.to_phone,
          firstname,
          lastname,
          email: user.email ?? undefined,
          mode: data.provider,
          description: `Retrait vers ${data.to_phone}`,
          merchantReference: generateReference()
        })
        console.log('[FedaPay Payout] Response:', JSON.stringify(response, null, 2))
        return extractFedapayIdentifiers(response)
      } catch (error) {
        console.error('[FedaPay Payout] Error:', error)
        throw error
      }
    })()

  const result = await prisma.$transaction(async (tx) => {
    const freshSourceWallet = await tx.wallet.findUnique({
      where: { id: sourceWallet.id }
    })

    if (!freshSourceWallet) {
      throw new Error('SOURCE_WALLET_NOT_FOUND')
    }

    if (freshSourceWallet.balance.lt(amountDecimal)) {
      throw new Error('INSUFFICIENT_FUNDS')
    }

    const updatedSourceWallet = await tx.wallet.update({
      where: { id: freshSourceWallet.id },
      data: {
        balance: freshSourceWallet.balance.minus(amountDecimal)
      }
    })

    const reference = generateReference()

    const transaction = await tx.transaction.create({
      data: {
        reference,
        type: 'SEND',
        status: 'SUCCEEDED',
        amount: amountDecimal,
        currency: sourceWallet.currency,
        fromUserId: userId,
        fromWalletId: sourceWallet.id,
        direction: 'OUT',
        description: `Retrait vers ${data.to_phone}`
      }
    })

    if (payoutInfo.id != null || payoutInfo.reference != null) {
      await tx.$executeRaw`
        UPDATE "Transaction"
        SET "providerTransactionId" = ${payoutInfo.id ?? null},
            "providerReference" = ${payoutInfo.reference ?? null}
        WHERE "id" = ${transaction.id}
      `
    }

    return {
      transaction,
      fromWallet: updatedSourceWallet
    }
  })

  return {
    transaction: {
      id: result.transaction.id,
      reference: result.transaction.reference,
      type: result.transaction.type,
      status: result.transaction.status,
      amount: result.transaction.amount,
      currency: result.transaction.currency,
      direction: result.transaction.direction,
      createdAt: result.transaction.createdAt
    },
    fromWallet: {
      id: result.fromWallet.id,
      balance: result.fromWallet.balance,
      currency: result.fromWallet.currency,
      provider: result.fromWallet.provider
    },
    provider: {
      name: 'FedaPay',
      reference: payoutInfo.reference ?? null
    }
  }
}

export async function sendTransaction(userId: string, data: SendTransactionDto) {
  const amountDecimal = new Prisma.Decimal(data.amount)

  const sourceWallet =
    data.source_wallet_id != null
      ? await prisma.wallet.findFirst({
        where: {
          id: data.source_wallet_id,
          userId
        }
      })
      : await prisma.wallet.findFirst({
        where: {
          userId
        },
        orderBy: {
          createdAt: 'asc'
        }
      })

  if (!sourceWallet) {
    throw new Error('SOURCE_WALLET_NOT_FOUND')
  }

  let recipientUserId: string | null = null
  let recipientWalletId: string | null = null
  let recipientUser: { id: string; fullName: string; email: string | null; phone: string } | null = null

  if (data.to_user_id) {
    const user = await prisma.user.findUnique({
      where: { id: data.to_user_id }
    })

    if (!user) {
      throw new Error('RECIPIENT_NOT_FOUND')
    }

    recipientUser = user
    recipientUserId = user.id

    const wallet = await prisma.wallet.findFirst({
      where: {
        userId: user.id
      },
      orderBy: {
        createdAt: 'asc'
      }
    })

    if (wallet) {
      recipientWalletId = wallet.id
    }
  } else if (data.to_phone) {
    const user = await prisma.user.findUnique({
      where: { phone: data.to_phone }
    })

    if (!user) {
      throw new Error('RECIPIENT_NOT_FOUND')
    }

    recipientUser = user
    recipientUserId = user.id

    const wallet = await prisma.wallet.findFirst({
      where: {
        userId: user.id
      },
      orderBy: {
        createdAt: 'asc'
      }
    })

    if (wallet) {
      recipientWalletId = wallet.id
    }
  }

  if (recipientUserId && recipientUserId === userId) {
    throw new Error('SELF_TRANSFER_NOT_ALLOWED')
  }

  let fedapayInfo: { id?: string; reference?: string } = {}
  let fedapaySendResult: unknown = null

  if (data.to_phone) {
    let firstname: string | undefined
    let lastname: string | undefined
    let email: string | undefined

    const user =
      recipientUser && recipientUser.phone === data.to_phone
        ? recipientUser
        : await prisma.user.findUnique({ where: { phone: data.to_phone } })

    if (user) {
      const nameParts = user.fullName.trim().split(/\s+/)
      lastname = nameParts.length > 1 ? nameParts.pop() : ''
      firstname = nameParts.join(' ') || user.fullName
      email = user.email ?? undefined
    }

    const fedapayPayload = await createFedapayCollect({
      amount: data.amount,
      currency: sourceWallet.currency,
      customerPhone: data.to_phone,
      firstname,
      lastname,
      email,
      provider: data.provider,
      description:
        data.to_user_id != null
          ? `Envoi vers utilisateur ${data.to_user_id}`
          : `Envoi vers ${data.to_phone}`
    })

    fedapayInfo = extractFedapayIdentifiers(fedapayPayload)

    if (fedapayInfo.id) {
      const tokenPayload = await createFedapayTransactionToken(fedapayInfo.id)

      const tokenValue: number | undefined =
        tokenPayload &&
          typeof tokenPayload === 'object' &&
          'token' in tokenPayload &&
          typeof (tokenPayload as Record<string, unknown>).token === 'number'
          ? (tokenPayload as Record<string, unknown>).token as number
          : undefined

      if (tokenValue !== undefined) {
        const mode = data.provider ?? 'automatic'

        const sendResult = await sendFedapayPayment({
          mode,
          token: tokenValue,
          phoneNumber: {
            number: data.to_phone,
            country: 'tg'
          }
        })
        fedapaySendResult = sendResult
      }
    }
  }

  const result = await prisma.$transaction(async (tx) => {
    const freshSourceWallet = await tx.wallet.findUnique({
      where: { id: sourceWallet.id }
    })

    if (!freshSourceWallet) {
      throw new Error('SOURCE_WALLET_NOT_FOUND')
    }

    if (freshSourceWallet.balance.lt(amountDecimal)) {
      throw new Error('INSUFFICIENT_FUNDS')
    }

    const updatedSourceWallet = await tx.wallet.update({
      where: { id: freshSourceWallet.id },
      data: {
        balance: freshSourceWallet.balance.minus(amountDecimal)
      }
    })

    let updatedRecipientWallet = null

    if (recipientWalletId) {
      const wallet = await tx.wallet.findUnique({
        where: { id: recipientWalletId }
      })

      if (wallet) {
        updatedRecipientWallet = await tx.wallet.update({
          where: { id: wallet.id },
          data: {
            balance: wallet.balance.plus(amountDecimal)
          }
        })
      }
    }

    const reference = generateReference()

    const transaction = await tx.transaction.create({
      data: {
        reference,
        type: 'SEND',
        status: 'SUCCEEDED',
        amount: amountDecimal,
        currency: sourceWallet.currency,
        fromUserId: userId,
        toUserId: recipientUserId ?? undefined,
        fromWalletId: sourceWallet.id,
        toWalletId: recipientWalletId ?? undefined,
        direction: 'OUT',
        description:
          data.to_phone != null
            ? `Envoi vers ${data.to_phone}`
            : data.to_user_id != null
              ? `Envoi vers utilisateur ${data.to_user_id}`
              : 'Envoi'
      }
    })

    if (fedapayInfo.id != null || fedapayInfo.reference != null) {
      await tx.$executeRaw`
        UPDATE "Transaction"
        SET "providerTransactionId" = ${fedapayInfo.id ?? null},
            "providerReference" = ${fedapayInfo.reference ?? null}
        WHERE "id" = ${transaction.id}
      `
    }

    return {
      transaction,
      fromWallet: updatedSourceWallet,
      toWallet: updatedRecipientWallet
    }
  })

  const sendItem =
    Array.isArray(fedapaySendResult) && fedapaySendResult.length > 0
      ? (fedapaySendResult as unknown[])[0]
      : fedapaySendResult

  const providerReference =
    sendItem && typeof sendItem === 'object' && 'reference' in (sendItem as Record<string, unknown>)
      ? ((sendItem as Record<string, unknown>).reference as string | undefined)
      : fedapayInfo.reference ?? null

  const providerStatus =
    sendItem && typeof sendItem === 'object' && 'status' in (sendItem as Record<string, unknown>)
      ? ((sendItem as Record<string, unknown>).status as string | undefined)
      : undefined

  const providerMode =
    sendItem && typeof sendItem === 'object' && 'mode' in (sendItem as Record<string, unknown>)
      ? ((sendItem as Record<string, unknown>).mode as string | undefined)
      : data.provider ?? 'automatic'

  return {
    transaction: {
      id: result.transaction.id,
      reference: result.transaction.reference,
      type: result.transaction.type,
      status: result.transaction.status,
      amount: result.transaction.amount,
      currency: result.transaction.currency,
      direction: result.transaction.direction,
      createdAt: result.transaction.createdAt
    },
    fromWallet: {
      id: result.fromWallet.id,
      balance: result.fromWallet.balance,
      currency: result.fromWallet.currency,
      provider: result.fromWallet.provider
    },
    toWallet: result.toWallet
      ? {
        id: result.toWallet.id,
        balance: result.toWallet.balance,
        currency: result.toWallet.currency,
        provider: result.toWallet.provider
      }
      : null,
    provider: {
      name: 'FedaPay',
      reference: providerReference ?? null,
      status: providerStatus ?? null,
      mode: providerMode ?? null
    }
  }
}
