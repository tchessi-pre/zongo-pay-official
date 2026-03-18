import type { Context } from 'hono'
import {
  createPayoutSchema,
  sendTransactionSchema,
  transactionFromQrSchema
} from '../dto/transactions.dto.js'
import { sendPayout, sendTransaction } from '../services/transactions.service.js'
import { resolvePaymentRequestFromCode } from '../services/paymentRequest.service.js'
import { getUserTransactionById, listUserTransactions } from '../services/transactionsList.service.js'

export async function sendTransactionController(c: Context) {
  const user = c.get('user') as { id: string } | undefined

  if (!user) {
    return c.json(
      {
        code: 'UNAUTHORIZED',
        message: 'Utilisateur non authentifié'
      },
      401
    )
  }

  const body = await c.req.json().catch(() => null)

  const parsed = sendTransactionSchema.safeParse(body)

  if (!parsed.success) {
    return c.json(
      {
        code: 'VALIDATION_ERROR',
        message: 'to_phone ou to_user_id, amount sont requis'
      },
      400
    )
  }

  try {
    const result = await sendTransaction(user.id, parsed.data)
    return c.json(result, 201)
  } catch (error) {
    if (error instanceof Error && error.message === 'SOURCE_WALLET_NOT_FOUND') {
      return c.json(
        {
          code: 'SOURCE_WALLET_NOT_FOUND',
          message: 'Wallet source introuvable pour cet utilisateur'
        },
        404
      )
    }

    if (error instanceof Error && error.message === 'RECIPIENT_NOT_FOUND') {
      return c.json(
        {
          code: 'RECIPIENT_NOT_FOUND',
          message: 'Destinataire introuvable'
        },
        404
      )
    }

    if (error instanceof Error && error.message === 'INSUFFICIENT_FUNDS') {
      return c.json(
        {
          code: 'INSUFFICIENT_FUNDS',
          message: 'Solde insuffisant sur le wallet source'
        },
        400
      )
    }

    if (error instanceof Error && error.message === 'SELF_TRANSFER_NOT_ALLOWED') {
      return c.json(
        {
          code: 'SELF_TRANSFER_NOT_ALLOWED',
          message: 'Impossible d’envoyer de l’argent à soi-même'
        },
        400
      )
    }

    if (error instanceof Error && error.message === 'FEDAPAY_API_ERROR') {
      const anyError = error as Error & { status?: number; details?: unknown }

      return c.json(
        {
          code: 'FEDAPAY_API_ERROR',
          message: 'Erreur lors de l’appel à FedaPay',
          details: {
            status: anyError.status,
            response: anyError.details
          }
        },
        502
      )
    }

    throw error
  }
}

export async function listTransactionsController(c: Context) {
  const user = c.get('user') as { id: string } | undefined

  if (!user) {
    return c.json(
      {
        code: 'UNAUTHORIZED',
        message: 'Utilisateur non authentifié'
      },
      401
    )
  }

  const pageParam = c.req.query('page')
  const pageSizeParam = c.req.query('pageSize')

  const page = pageParam ? Number(pageParam) : 1
  const pageSize = pageSizeParam ? Number(pageSizeParam) : 20

  const result = await listUserTransactions(user.id, page, pageSize)

  return c.json(result)
}

export async function getTransactionByIdController(c: Context) {
  const user = c.get('user') as { id: string } | undefined

  if (!user) {
    return c.json(
      {
        code: 'UNAUTHORIZED',
        message: 'Utilisateur non authentifié'
      },
      401
    )
  }

  const id = c.req.param('id')

  try {
    const tx = await getUserTransactionById(user.id, id)
    return c.json(tx)
  } catch (error) {
    if (error instanceof Error && error.message === 'TRANSACTION_NOT_FOUND') {
      return c.json(
        {
          code: 'TRANSACTION_NOT_FOUND',
          message: 'Transaction introuvable pour cet utilisateur'
        },
        404
      )
    }

    throw error
  }
}

export async function transactionFromQrController(c: Context) {
  const user = c.get('user') as { id: string } | undefined

  if (!user) {
    return c.json(
      {
        code: 'UNAUTHORIZED',
        message: 'Utilisateur non authentifié'
      },
      401
    )
  }

  const body = await c.req.json().catch(() => null)

  const parsed = transactionFromQrSchema.safeParse(body)

  if (!parsed.success) {
    return c.json(
      {
        code: 'VALIDATION_ERROR',
        message: 'code est requis'
      },
      400
    )
  }

  try {
    const result = await resolvePaymentRequestFromCode(parsed.data.code)
    return c.json(result)
  } catch (error) {
    if (error instanceof Error && error.message === 'PAYMENT_REQUEST_NOT_FOUND') {
      return c.json(
        {
          code: 'PAYMENT_REQUEST_NOT_FOUND',
          message: 'PaymentRequest introuvable pour ce code'
        },
        404
      )
    }

    if (error instanceof Error && error.message === 'PAYMENT_REQUEST_INACTIVE') {
      return c.json(
        {
          code: 'PAYMENT_REQUEST_INACTIVE',
          message: 'PaymentRequest inactif'
        },
        400
      )
    }

    if (error instanceof Error && error.message === 'PAYMENT_REQUEST_EXPIRED') {
      return c.json(
        {
          code: 'PAYMENT_REQUEST_EXPIRED',
          message: 'PaymentRequest expiré'
        },
        400
      )
    }

    if (error instanceof Error && error.message === 'PAYMENT_REQUEST_MAX_USES_REACHED') {
      return c.json(
        {
          code: 'PAYMENT_REQUEST_MAX_USES_REACHED',
          message: 'Nombre maximal d’utilisations atteint pour ce PaymentRequest'
        },
        400
      )
    }

    throw error
  }
}

export async function createPayoutController(c: Context) {
  const user = c.get('user') as { id: string } | undefined

  if (!user) {
    return c.json(
      {
        code: 'UNAUTHORIZED',
        message: 'Utilisateur non authentifié'
      },
      401
    )
  }

  const body = await c.req.json().catch(() => null)

  const parsed = createPayoutSchema.safeParse(body)

  if (!parsed.success) {
    return c.json(
      {
        code: 'VALIDATION_ERROR',
        message: 'to_phone, amount et provider sont requis'
      },
      400
    )
  }

  try {
    const result = await sendPayout(user.id, parsed.data)
    return c.json(result, 201)
  } catch (error) {
    if (error instanceof Error && error.message === 'SOURCE_WALLET_NOT_FOUND') {
      return c.json(
        {
          code: 'SOURCE_WALLET_NOT_FOUND',
          message: 'Wallet source introuvable pour cet utilisateur'
        },
        404
      )
    }

    if (error instanceof Error && error.message === 'USER_NOT_FOUND') {
      return c.json(
        {
          code: 'USER_NOT_FOUND',
          message: 'Utilisateur introuvable'
        },
        404
      )
    }

    if (error instanceof Error && error.message === 'INSUFFICIENT_FUNDS') {
      return c.json(
        {
          code: 'INSUFFICIENT_FUNDS',
          message: 'Solde insuffisant sur le wallet source'
        },
        400
      )
    }

    if (error instanceof Error && error.message === 'FEDAPAY_API_ERROR') {
      const anyError = error as Error & { status?: number; details?: unknown }

      return c.json(
        {
          code: 'FEDAPAY_API_ERROR',
          message: 'Erreur lors de l’appel à FedaPay',
          details: {
            status: anyError.status,
            response: anyError.details
          }
        },
        502
      )
    }

    throw error
  }
}
