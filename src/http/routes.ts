import { FastifyInstance } from 'fastify'
import { register } from './controllers/register.controller'
import { createPet } from './controllers/create-pet.controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/organization', register)

  app.post('/pet', createPet)
}
