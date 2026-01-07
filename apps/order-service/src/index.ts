import Fastify, { FastifyRequest, FastifyReply } from 'fastify'

const fastify = Fastify({
  logger: true,
})

fastify.get('/health', (req: FastifyRequest, reply: FastifyReply) => {
  reply.status(200).send({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  })
})

const start = async () => {
  try {
    await fastify.listen({ port: 8001 })
    console.log('Server running on http://localhost:8001')
  } catch (error) {
    fastify.log.error(error)
    process.exit(1)
  }
}

start()
