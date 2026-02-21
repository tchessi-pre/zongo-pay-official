import { Hono } from 'hono'
import { fedapayWebhookController } from '../../controllers/webhooks.controller.js'

const app = new Hono()

app.post('/', fedapayWebhookController)

export default app

