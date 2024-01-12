import { Pet, Prisma } from '@prisma/client'
import { FindAllParams, PetsRepository } from '../pets.repository'
import { randomUUID } from 'node:crypto'
import { OrganizationsRepository } from '../organizations.repository'

export class InMemoryPetsRepository implements PetsRepository {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  public items: Pet[] = []

  async findByCity({ city }: FindAllParams) {
    const orgs = await this.organizationsRepository.findManyByCity(city)

    const petsByOrgsInCity = this.items.filter((pet) =>
      orgs.some((org) => org.id === pet.organization_id),
    )

    return petsByOrgsInCity
  }

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      about: data.about ?? null,
      age: data.age,
      energy: data.energy,
      environment: data.environment,
      independence: data.independence,
      organization_id: data.organization_id,
      size: data.size,
    }

    this.items.push(pet)

    return pet
  }
}
