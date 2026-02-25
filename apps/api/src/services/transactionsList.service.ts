import { prisma } from '../db.js'

export async function listUserTransactions(
  userId: string,
  page: number,
  pageSize: number
) {
  const safePage = Number.isFinite(page) && page > 0 ? page : 1
  const safePageSize =
    Number.isFinite(pageSize) && pageSize > 0 && pageSize <= 100 ? pageSize : 20

  const where = {
    OR: [{ fromUserId: userId }, { toUserId: userId }]
  }

  const [total, items] = await Promise.all([
    prisma.transaction.count({ where }),
    prisma.transaction.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      },
      skip: (safePage - 1) * safePageSize,
      take: safePageSize
    })
  ])

  return {
    meta: {
      page: safePage,
      pageSize: safePageSize,
      total
    },
    items: items.map((t) => ({
      id: t.id,
      reference: t.reference,
      type: t.type,
      status: t.status,
      amount: t.amount,
      currency: t.currency,
      direction: t.direction,
      createdAt: t.createdAt
    }))
  }
}

export async function getUserTransactionById(userId: string, id: string) {
  const tx = await prisma.transaction.findFirst({
    where: {
      id,
      OR: [{ fromUserId: userId }, { toUserId: userId }]
    }
  })

  if (!tx) {
    throw new Error('TRANSACTION_NOT_FOUND')
  }

  return {
    id: tx.id,
    reference: tx.reference,
    type: tx.type,
    status: tx.status,
    amount: tx.amount,
    currency: tx.currency,
    direction: tx.direction,
    createdAt: tx.createdAt
  }
}

