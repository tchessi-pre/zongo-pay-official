import { Hono } from 'hono'
import { loginStartController, loginVerifyController } from '../../controllers/auth.controller.js'

const app = new Hono()

app.post('/login', loginStartController)
app.post('/login/verify', loginVerifyController)

export default app

