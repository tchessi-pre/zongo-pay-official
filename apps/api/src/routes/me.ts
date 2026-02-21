import { Hono } from 'hono'
import { meController, mePaymentRequestController } from '../controllers/me.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const app = new Hono()

app.get('/', authMiddleware, meController)
app.get('/payment-request', authMiddleware, mePaymentRequestController)

export default app

