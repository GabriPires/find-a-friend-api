import { CreatePetUseCase } from './create-pet'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets.repository'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations.repository'
import { ResourceNotFoundError } from './errors/resource-not-found.error'

let petsRepository: InMemoryPetsRepository
let organizationsRepository: InMemoryOrganizationsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(async () => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    petsRepository = new InMemoryPetsRepository(organizationsRepository)
    sut = new CreatePetUseCase(organizationsRepository, petsRepository)

    await organizationsRepository.create({
      id: 'organization-id',
      address: 'Rua dos Bobos, 0',
      city: 'São Paulo',
      cep: '00000-000',
      email: 'johndoe@example.com',
      password: '12345678',
      responsible: 'John Doe',
      whatsapp: '00000000000',
    })
  })

  it('should be able to create a new pet', async () => {
    const { pet } = await sut.execute({
      name: 'Brutus',
      about: 'A very cute dog',
      age: 3,
      energy: 2,
      environment: 1,
      independence: 2,
      size: 2,
      organizationId: 'organization-id',
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to create a new pet with a non-existing organization', async () => {
    await expect(
      sut.execute({
        name: 'Brutus',
        about: 'A very cute dog',
        age: 3,
        energy: 2,
        environment: 1,
        independence: 2,
        size: 2,
        organizationId: 'non-existing-organization-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
