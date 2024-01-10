import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets.repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

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
