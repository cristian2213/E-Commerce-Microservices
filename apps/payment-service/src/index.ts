import { clerkMiddleware, getAuth } from '@hono/clerk-auth'
import { serve } from '@hono/node-server'
import { Hono, Context } from 'hono'

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

app.get('/test', (c: Context) => {
  const auth = getAuth(c)
  const userId = auth?.userId

  if (!userId) {
    return c.json({ message: 'You are not logged in' }, 401)
  }

  return c.json({ message: 'Order service authenticated' }, 200)
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
