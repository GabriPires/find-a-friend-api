import { OrganizationsRepository } from '@/repositories/organizations.repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found.error'
import { PetsRepository } from '@/repositories/pets.repository'

interface CreatePetUseCaseRequest {
  name: string
  about?: string
  age: number
  size: number
  energy: number
  independence: number
  environment: number
  organizationId: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private organizationsRepository: OrganizationsRepository,
    private petsRepository: PetsRepository,
  ) {}

  async execute({
    organizationId,
    age,
    energy,
    environment,
    independence,
    name,
    size,
    about,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const organization =
      await this.organizationsRepository.findById(organizationId)

    if (!organization) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petsRepository.create({
      about,
      age,
      energy,
      environment,
      independence,
      name,
      size,
      organization_id: organizationId,
    })

    return { pet }
  }
}
