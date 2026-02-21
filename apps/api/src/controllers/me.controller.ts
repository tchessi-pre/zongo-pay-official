import type { Context } from 'hono'
import { getMe } from '../services/me.service.js'
import { getOrCreateProfilePaymentRequest } from '../services/paymentRequest.service.js'

export async function meController(c: Context) {
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

  try {
    const result = await getMe(user.id)
    return c.json(result)
  } catch (error) {
    if (error instanceof Error && error.message === 'USER_NOT_FOUND') {
      return c.json(
        {
          code: 'USER_NOT_FOUND',
          message: "L'utilisateur n'existe plus"
        },
        404
      )
    }

    throw error
  }
}

export async function mePaymentRequestController(c: Context) {
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

  const result = await getOrCreateProfilePaymentRequest(user.id)

  return c.json(result)
}
