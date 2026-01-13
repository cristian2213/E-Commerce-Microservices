import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { shouldBeAdmin, shouldBeUser } from '../middleware/authMiddleware'
import { Order } from '@repo/order-db'

export const orderRoutes = async (fastify: FastifyInstance) => {
  fastify.get(
    '/user-orders',
    { preHandler: [shouldBeUser] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const order = await Order.find({ userId: request.userId })
      reply.send(order)
    },
  )

  fastify.get(
    '/orders',
    { preHandler: [shouldBeAdmin] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const orders = await Order.find()
      reply.send(orders)
    },
  )
}
