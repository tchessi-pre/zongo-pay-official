import { Hono } from 'hono'
import {
  createPayoutController,
  getTransactionByIdController,
  listTransactionsController,
  sendTransactionController,
  transactionFromQrController
} from '../controllers/transactions.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const app = new Hono()

app.get('/', authMiddleware, listTransactionsController)
app.get('/:id', authMiddleware, getTransactionByIdController)
app.post('/send', authMiddleware, sendTransactionController)
app.post('/from-qr', authMiddleware, transactionFromQrController)
app.post('/payouts', authMiddleware, createPayoutController)

export default app
