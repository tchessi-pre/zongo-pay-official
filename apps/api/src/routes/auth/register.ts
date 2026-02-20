import { Hono } from 'hono'
import { registerController } from '../../controllers/auth.controller.js'

const app = new Hono()

app.post('/register', registerController)

export default app

