import { test } from 'uvu'
import * as assert from 'uvu/assert'
import fastify from 'fastify'
import validate from '../src/index.js'

test('initial test', async () => {
  const app = fastify()

  await app.register(validate)

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

  const res = await app.inject({
    method: 'GET',
    path: '/'
  })

  assert.equal(res.payload, JSON.stringify({ statusCode: 500, error: 'Internal Server Error', message: 'response/answer must match format "date"' }))
})

test.run()
