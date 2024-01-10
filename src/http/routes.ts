import { FastifyInstance } from 'fastify'
import { register } from './controllers/register.controller'
import { createPet } from './controllers/create-pet.controller'
import { authenticate } from './controllers/authenticate.controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/organization', register)
  app.post('/authenticate', authenticate)

  app.post('/pet', createPet)
}
