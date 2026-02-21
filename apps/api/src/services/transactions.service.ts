import { Prisma } from '@prisma/client'
import { prisma } from '../db.js'
import type { SendTransactionDto } from '../dto/transactions.dto.js'
import { createFedapayCollect } from '../clients/fedapay.client.js'

function generateReference() {
  return `TX-${Date.now()}-${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0')}`
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

  if (data.to_user_id) {
    const user = await prisma.user.findUnique({
      where: { id: data.to_user_id }
    })

    if (!user) {
      throw new Error('RECIPIENT_NOT_FOUND')
    }

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

  if (data.to_phone) {
    await createFedapayCollect({
      amount: data.amount,
      currency: sourceWallet.currency,
      customerPhone: data.to_phone,
      provider: data.provider,
      description:
        data.to_user_id != null
          ? `Envoi vers utilisateur ${data.to_user_id}`
          : `Envoi vers ${data.to_phone}`
    })
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

    return {
      transaction,
      fromWallet: updatedSourceWallet,
      toWallet: updatedRecipientWallet
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
    toWallet: result.toWallet
      ? {
        id: result.toWallet.id,
        balance: result.toWallet.balance,
        currency: result.toWallet.currency,
        provider: result.toWallet.provider
      }
      : null
  }
}
