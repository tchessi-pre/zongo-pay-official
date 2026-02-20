import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { secureHeaders } from 'hono/secure-headers';
import { prettyJSON } from 'hono/pretty-json';
import { compress } from 'hono/compress';
import { PrismaClient } from '@prisma/client';
import { openApiSpec } from './openapi/index.js';
import { swaggerUI } from '@hono/swagger-ui';

const prisma = new PrismaClient();

const app = new Hono();

app.use('*', secureHeaders());
app.use(
  '*',
  cors({
    origin: 'http://localhost:5173',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);
app.use('*', logger());
app.use('*', prettyJSON());
app.use('*', compress());

app.get('/', (c) => c.text('✅ Serveur Hono opérationnel !'));
app.get('/hello/:name', (c) =>
  c.json({ message: `Hello ${c.req.param('name')}!` })
);
app.get('/health/db', async (c) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return c.json({ status: 'ok', db: true });
  } catch (error) {
    return c.json({ status: 'error', db: false }, 500);
  }
});

app.get('/health', (c) =>
  c.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  })
);

app.get('/openapi.json', (c) => c.json(openApiSpec));
app.get(
  '/docs',
  swaggerUI({
    url: '/openapi.json',
    persistAuthorization: true,
  })
);

const port = Number(process.env.PORT ?? 8787);

console.log(`🚀 API listening on http://localhost:${port}`);
console.log(`📖 Swagger UI disponible sur http://localhost:${port}/docs`);
serve({ fetch: app.fetch, port });
