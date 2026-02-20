import { serve } from '@hono/node-server'
import { app } from './app.js'

const port = Number(process.env.PORT ?? 8787)

console.log(`🚀 API listening on http://localhost:${port}`)
console.log(`📖 Swagger UI available at http://localhost:${port}/docs`)
serve({ fetch: app.fetch, port })
