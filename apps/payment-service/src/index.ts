import { clerkMiddleware, getAuth } from '@hono/clerk-auth'
import { serve } from '@hono/node-server'
import { Hono, Context } from 'hono'
import { shouldBeUser } from './middleware/authMiddleware.js'
import stripe from './utils/strip.js'

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

// app.post('/create-stripe-product', async (c: Context) => {
//   const res = await stripe.products.create({
//     id: 'product_123',
//     name: 'Test Product',
//     default_price_data: {
//       currency: 'usd',
//       unit_amount: 10 * 100, // 10 usd
//     },
//   })

//   return c.json(res)
// })

// app.get('/stripe-product-price', async (c: Context) => {
//   const res = await stripe.prices.list({
//     product: 'product_123',
//   })

//   return c.json(res)
// })

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
