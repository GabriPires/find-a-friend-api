import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { hash } from 'bcryptjs'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    responsible: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    cep: z.string().length(8),
    address: z.string(),
    whatsapp: z.string().length(11),
  })

  const { address, cep, email, password, responsible, whatsapp } =
    bodySchema.parse(request.body)

  const userWithSameEmail = await prisma.organization.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    return reply.status(409).send()
  }

  const passwordHash = await hash(password, 6)

  await prisma.organization.create({
    data: {
      address,
      cep,
      email,
      password: passwordHash,
      responsible,
      whatsapp,
    },
  })

  return reply.status(201).send()
}
