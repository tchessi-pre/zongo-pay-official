import type { Context } from 'hono'
import { handleFedapayWebhook } from '../services/fedapayWebhook.service.js'

const fedapayWebhookToken = process.env.FEDAPAY_WEBHOOK_TOKEN ?? ''

export async function fedapayWebhookController(c: Context) {
  if (!fedapayWebhookToken) {
    return c.json(
      {
        code: 'WEBHOOK_SECRET_NOT_CONFIGURED',
        message: 'FEDAPAY_WEBHOOK_TOKEN doit être configuré'
      },
      500
    )
  }

  const headerToken = c.req.header('x-fedapay-webhook-token')

  if (!headerToken || headerToken !== fedapayWebhookToken) {
    return c.json(
      {
        code: 'UNAUTHORIZED',
        message: 'Signature de webhook invalide'
      },
      401
    )
  }

  const payload = await c.req.json().catch(() => null)
  await handleFedapayWebhook(payload)

  return c.json({ status: 'ok' })
}


