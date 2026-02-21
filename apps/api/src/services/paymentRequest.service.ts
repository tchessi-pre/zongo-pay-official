import { prisma } from '../db.js'

function generatePaymentRequestCode() {
  const random = Math.floor(Math.random() * 1_000_000_000)
  return `PR-${Date.now()}-${random.toString().padStart(9, '0')}`
}

export async function getOrCreateProfilePaymentRequest(userId: string) {
  const now = new Date()

  const existing = await prisma.paymentRequest.findFirst({
    where: {
      ownerUserId: userId,
      status: 'ACTIVE',
      isSingleUse: false,
      OR: [
        { expiresAt: null },
        {
          expiresAt: {
            gt: now
          }
        }
      ]
    },
    orderBy: {
      createdAt: 'asc'
    }
  })

  if (existing) {
    return {
      code: existing.code,
      url: `zongo://pay/${existing.code}`,
      paymentRequest: existing
    }
  }

  const code = generatePaymentRequestCode()

  const created = await prisma.paymentRequest.create({
    data: {
      code,
      ownerUserId: userId,
      isSingleUse: false,
      status: 'ACTIVE'
    }
  })

  return {
    code: created.code,
    url: `zongo://pay/${created.code}`,
    paymentRequest: created
  }
}

export async function resolvePaymentRequestFromCode(code: string) {
  const now = new Date()

  const paymentRequest = await prisma.paymentRequest.findUnique({
    where: {
      code
    }
  })

  if (!paymentRequest) {
    throw new Error('PAYMENT_REQUEST_NOT_FOUND')
  }

  if (paymentRequest.status !== 'ACTIVE') {
    throw new Error('PAYMENT_REQUEST_INACTIVE')
  }

  if (paymentRequest.expiresAt && paymentRequest.expiresAt <= now) {
    throw new Error('PAYMENT_REQUEST_EXPIRED')
  }

  if (paymentRequest.maxUses != null && paymentRequest.usesCount >= paymentRequest.maxUses) {
    throw new Error('PAYMENT_REQUEST_MAX_USES_REACHED')
  }

  const owner = await prisma.user.findUnique({
    where: {
      id: paymentRequest.ownerUserId
    }
  })

  return {
    paymentRequest,
    owner: owner
      ? {
        id: owner.id,
        phone: owner.phone,
        fullName: owner.fullName
      }
      : null,
    suggestedTransaction: {
      to_user_id: paymentRequest.ownerUserId,
      amount: paymentRequest.amount,
      provider: paymentRequest.provider
    }
  }
}

