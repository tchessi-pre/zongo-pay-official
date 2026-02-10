import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { cors } from 'hono/cors'

const app = new Hono()

// Autoriser le front en dev
app.use('/*', cors())

app.get('/', (c) => c.text('OK'))
app.get('/hello/:name', (c) => c.json({ message: `Hello ${c.req.param('name')}!` }))

const port = Number(process.env.PORT) || 8787
console.log(`API listening on http://localhost:${port}`)
serve({ fetch: app.fetch, port })
