import { Pet, Prisma } from '@prisma/client'

export interface FindAllParams {
  city: string
  query?: string
}

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>
  findByCity(params: FindAllParams): Promise<Pet[]>
  create(pet: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
