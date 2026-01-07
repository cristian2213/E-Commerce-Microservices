import Fastify from 'fastify'

const fastify = Fastify({
  logger: true,
})

fastify.get('/', (req, reply) => {
  reply.send('Order service')
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
