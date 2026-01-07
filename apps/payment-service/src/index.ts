import { serve } from '@hono/node-server'
import { Hono, Context } from 'hono'

const app = new Hono()

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
