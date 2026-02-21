import { Hono } from 'hono'
import { sendTransactionController, transactionFromQrController } from '../controllers/transactions.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const app = new Hono()

app.post('/send', authMiddleware, sendTransactionController)
app.post('/from-qr', authMiddleware, transactionFromQrController)

export default app
