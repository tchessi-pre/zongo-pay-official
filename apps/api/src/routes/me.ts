import { Hono } from 'hono'
import { meController } from '../controllers/me.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const app = new Hono()

app.get('/', authMiddleware, meController)

export default app

