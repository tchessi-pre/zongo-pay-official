import type { Context } from 'hono'
import { registerSchema, loginSchema, loginVerifySchema } from '../dto/auth.dto.js'
import { registerUser, startLogin, verifyLoginCode } from '../services/auth.service.js'

export async function registerController(c: Context) {
  const body = await c.req.json().catch(() => null)

  const parsed = registerSchema.safeParse(body)

  if (!parsed.success) {
    return c.json(
      {
        code: 'VALIDATION_ERROR',
        message: 'phone, full_name et pin sont requis'
      },
      400
    )
  }

  try {
    const result = await registerUser(parsed.data)
    return c.json(result, 201)
  } catch (error) {
    if (error instanceof Error && error.message === 'USER_ALREADY_EXISTS') {
      return c.json(
        {
          code: 'USER_ALREADY_EXISTS',
          message: 'Un utilisateur avec ce numéro existe déjà'
        },
        409
      )
    }

    throw error
  }
}

export async function loginStartController(c: Context) {
  const body = await c.req.json().catch(() => null)

  const parsed = loginSchema.safeParse(body)

  if (!parsed.success) {
    return c.json(
      {
        code: 'VALIDATION_ERROR',
        message: 'phone et pin sont requis'
      },
      400
    )
  }

  try {
    const result = await startLogin(parsed.data)
    return c.json(result)
  } catch (error) {
    if (error instanceof Error && error.message === 'INVALID_CREDENTIALS') {
      return c.json(
        {
          code: 'INVALID_CREDENTIALS',
          message: 'Identifiants invalides'
        },
        401
      )
    }

    throw error
  }
}

export async function loginVerifyController(c: Context) {
  const body = await c.req.json().catch(() => null)

  const parsed = loginVerifySchema.safeParse(body)

  if (!parsed.success) {
    return c.json(
      {
        code: 'VALIDATION_ERROR',
        message: 'phone et code sont requis'
      },
      400
    )
  }

  try {
    const result = await verifyLoginCode(parsed.data)
    return c.json(result)
  } catch (error) {
    if (error instanceof Error && error.message === 'INVALID_OTP') {
      return c.json(
        {
          code: 'INVALID_OTP',
          message: 'Code invalide ou expiré'
        },
        401
      )
    }

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

