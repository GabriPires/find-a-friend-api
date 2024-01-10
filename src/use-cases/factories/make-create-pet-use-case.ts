import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations.repository'
import { CreatePetUseCase } from '../create-pet'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets.repository'

export function makeCreatePetUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository()
  const petsRepository = new PrismaPetsRepository()
  const createPetUseCase = new CreatePetUseCase(
    organizationsRepository,
    petsRepository,
  )

  return createPetUseCase
}
