import { Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>
  create(pet: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
