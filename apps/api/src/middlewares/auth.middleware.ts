import type { Context, Next } from 'hono'
import jwt from 'jsonwebtoken'

const jwtSecret = process.env.JWT_SECRET ?? 'dev-secret'

export async function authMiddleware(c: Context, next: Next) {
  const header = c.req.header('authorization')

  if (!header || !header.startsWith('Bearer ')) {
    return c.json(
      {
        code: 'UNAUTHORIZED',
        message: 'Token manquant'
      },
      401
    )
  }

  const token = header.slice('Bearer '.length)

  try {
    const payload = jwt.verify(token, jwtSecret) as {
      sub: string
      phone?: string
    }

    c.set('user', {
      id: payload.sub,
      phone: payload.phone
    })

    await next()
  } catch {
    return c.json(
      {
        code: 'UNAUTHORIZED',
        message: 'Token invalide'
      },
      401
    )
  }
}

