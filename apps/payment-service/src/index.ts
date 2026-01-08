import { clerkMiddleware, getAuth } from '@hono/clerk-auth'
import { serve } from '@hono/node-server'
import { Hono, Context } from 'hono'
import { shouldBeUser } from './middleware/authMiddleware.js'

const app = new Hono()

app.use('*', clerkMiddleware())

app.get('/health', (c: Context) => {
  return c.json(
    {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    },
    200,
  )
})

app.get('/test', shouldBeUser, (c: Context) => {
  return c.json(
    { message: 'Order service authenticated', userId: c.get('userId') },
    200,
  )
})

const start = async () => {
  try {
    serve(
      {
        fetch: app.fetch,
        port: 8002,
      },
      (info) => {
        console.log(`Server is running on http://localhost:${info.port}`)
      },
    )
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

start()
