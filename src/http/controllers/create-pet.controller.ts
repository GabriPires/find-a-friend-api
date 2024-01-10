import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found.error'
import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createPet(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string().min(1, 'Pet name is required'),
    about: z
      .string()
      .max(300, 'Pet about is too long. Max length is 300 characters')
      .optional(),
    age: z.number().min(0, 'Pet age must be a positive number'),
    size: z
      .number()
      .min(0, 'Pet size must be a positive number')
      .max(3, 'Pet size must be a number between 0 and 3'),
    energy: z
      .number()
      .min(0, 'Pet energy must be a positive number')
      .max(5, 'Pet energy must be a number between 0 and 5'),
    independence: z
      .number()
      .min(0, 'Pet independence must be a positive number')
      .max(3, 'Pet independence must be a number between 0 and 3'),
    environment: z
      .number()
      .min(0, 'Pet environment must be a positive number')
      .max(3, 'Pet environment must be a number between 0 and 3'),
    organizationId: z.string().uuid('Organization ID must be a valid UUID'),
    pictures: z.array(z.string()).optional(),
  })

  const {
    name,
    about,
    age,
    size,
    energy,
    independence,
    environment,
    organizationId,
  } = createPetBodySchema.parse(request.body)

  try {
    const useCase = makeCreatePetUseCase()

    await useCase.execute({
      name,
      about,
      age,
      size,
      energy,
      independence,
      environment,
      organizationId,
    })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(204).send({ error: error.message })
    }

    throw error
  }

  return reply.status(201).send()
}
