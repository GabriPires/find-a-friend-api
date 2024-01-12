import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations.repository'
import { FetchPetsUseCase } from './fetch-pets'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets.repository'
import { hash } from 'bcryptjs'

let organizationsRepository: InMemoryOrganizationsRepository
let petsRepository: InMemoryPetsRepository
let sut: FetchPetsUseCase

describe('Fetch Pets Use Case', () => {
  beforeEach(async () => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    petsRepository = new InMemoryPetsRepository(organizationsRepository)
    sut = new FetchPetsUseCase(petsRepository)

    const organization = await organizationsRepository.create({
      responsible: 'John Doe',
      email: 'johndoe@email.com',
      password: await hash('12345678', 6),
      address: 'Rua 1, 123',
      city: 'São Paulo',
      cep: '12345-123',
      whatsapp: '123456789',
    })

    await petsRepository.create({
      name: 'Brutus',
      about: 'A very cute dog',
      age: 3,
      energy: 2,
      environment: 1,
      independence: 2,
      size: 2,
      organization_id: organization.id,
    })
  })

  it('should be able to fetch pets by city', async () => {
    const { pets } = await sut.execute({
      city: 'São Paulo',
    })

    expect(pets).toHaveLength(1)
  })

  it('should not be able to fetch pets by city if city does has at least one pet registered', async () => {
    const { pets } = await sut.execute({
      city: 'Rio de Janeiro',
    })

    expect(pets).toHaveLength(0)
  })
})
