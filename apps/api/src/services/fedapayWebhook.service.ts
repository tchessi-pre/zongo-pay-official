import { prisma } from '../db.js'

type FedapayTransactionPayload = {
  id?: string | number
  amount?: number
  currency?: string
  status?: string
  reference?: string
}

type FedapayWebhookPayload = {
  event?: string
  data?: FedapayTransactionPayload
}

function buildReferenceFromPayload(data: FedapayTransactionPayload) {
  if (data.reference && data.reference.length > 0) {
    return data.reference
  }

  if (data.id !== undefined) {
    return `FEPAY-${data.id}`
  }

  return `FEPAY-${Date.now()}`
}

export async function handleFedapayWebhook(rawPayload: unknown) {
  const payload = rawPayload as FedapayWebhookPayload

  if (!payload || !payload.event || !payload.data) {
    return
  }

  const { event, data } = payload

  const reference = buildReferenceFromPayload(data)

  const amount = data.amount ?? 0
  const currency = data.currency ?? 'XOF'

  if (!event.startsWith('transaction.')) {
    return
  }

  const status =
    event === 'transaction.succeeded'
      ? 'SUCCEEDED'
      : event === 'transaction.failed'
      ? 'FAILED'
      : 'PENDING'

  const direction =
    event === 'transaction.succeeded'
      ? 'IN'
      : event === 'transaction.failed'
      ? 'OUT'
      : 'UNKNOWN'

  const type = 'EXTERNAL'

  await prisma.transaction.upsert({
    where: {
      reference
    },
    update: {
      status
    },
    create: {
      reference,
      type,
      status,
      amount,
      currency,
      direction
    }
  })
}

