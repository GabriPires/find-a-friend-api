import { PetsRepository } from '@/repositories/pets.repository'
import { Pet } from '@prisma/client'

interface FetchPetsUseCaseRequest {
  city: string
}

interface FetchPetsUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
  }: FetchPetsUseCaseRequest): Promise<FetchPetsUseCaseResponse> {
    const pets = await this.petsRepository.findByCity({
      city,
    })

    return { pets }
  }
}
