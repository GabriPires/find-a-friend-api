import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { UsersAlreadyExistsError } from '@/use-cases/errors/user-already-exists.error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    responsible: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    cep: z.string().length(8),
    address: z.string(),
    whatsapp: z.string().length(11),
  })

  const { address, cep, email, password, responsible, whatsapp } =
    registerBodySchema.parse(request.body)

  try {
    const useCase = makeRegisterUseCase()

    await useCase.execute({
      address,
      cep,
      email,
      password,
      responsible,
      whatsapp,
    })
  } catch (error) {
    if (error instanceof UsersAlreadyExistsError) {
      return reply.status(409).send({ error: error.message })
    }

    throw error
  }

  return reply.status(201).send()
}
