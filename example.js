import fastify from 'fastify'

const app = fastify()

await app.register(import('./src/index.js'))

app.route({
  method: 'GET',
  path: '/',
  schema: {
    response: {
      '2xx': {
        type: 'object',
        properties: {
          answer: { type: 'string', format: 'date' }
        }
      }
    }
  },
  handler: async (req, reply) => {
    return { answer: 'wrong date' }
  }
})

app.inject({
  method: 'GET',
  path: '/'
}, (err, res) => {
  if (err) throw err
  // {"statusCode":500,"error":"Internal Server Error","message":"response/answer must match format \"date\""}
  console.log(res.payload)
})
