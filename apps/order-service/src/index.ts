import Fastify, { FastifyRequest, FastifyReply } from 'fastify'
import { clerkPlugin, getAuth } from '@clerk/fastify'
import { shouldBeUser } from './middleware/authMiddleware.js'
import { connectOrderDB } from '@repo/order-db'
import { orderRoutes } from './routes/order.route.js'

const fastify = Fastify({
  logger: true,
})

fastify.register(clerkPlugin)

fastify.get('/health', (req: FastifyRequest, reply: FastifyReply) => {
  reply.status(200).send({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  })
})

fastify.get(
  '/test',
  { preHandler: shouldBeUser },
  (req: FastifyRequest, reply: FastifyReply) => {
    reply.send({ message: 'Order service authenticated', userId: req.userId })
  },
)

fastify.register(orderRoutes)

const start = async () => {
  try {
    await connectOrderDB()
    await fastify.listen({ port: 8001 })
    console.log('Server running on http://localhost:8001')
  } catch (error) {
    fastify.log.error(error)
    process.exit(1)
  }
}

start()
