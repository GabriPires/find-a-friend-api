import { FastifyInstance } from 'fastify'
import { register } from './controllers/register.controller'
import { createPet } from './controllers/create-pet.controller'
import { authenticate } from './controllers/authenticate.controller'
import { verifyJwt } from './middlewares/verify-jwt'
import { refresh } from './controllers/refresh.controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/organization', register)
  app.post('/authenticate', authenticate)

  app.patch('/token/refresh', refresh)

  app.post('/pet', { onRequest: [verifyJwt] }, createPet)
}
