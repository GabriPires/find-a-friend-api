import { expect, it, describe, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations.repository'
import { compare } from 'bcryptjs'
import { UsersAlreadyExistsError } from './errors/user-already-exists.error'

let organizationsRepository: InMemoryOrganizationsRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new RegisterUseCase(organizationsRepository)
  })

  it('should hash organization password upon registration', async () => {
    const password = '12345678'

    const { organization } = await sut.execute({
      responsible: 'John Doe',
      email: 'johndoe@example.com',
      address: 'Rua dos Bobos, 0',
      city: 'São Paulo',
      cep: '00000-000',
      password,
      whatsapp: '00000000000',
    })

    const isPasswordCorrectlyHashed = await compare(
      password,
      organization.password,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      responsible: 'John Doe',
      email,
      address: 'Rua dos Bobos, 0',
      city: 'São Paulo',
      cep: '00000-000',
      password: '12345678',
      whatsapp: '00000000000',
    })

    expect(
      async () =>
        await sut.execute({
          responsible: 'John Doe',
          email,
          address: 'Rua dos Bobos, 0',
          city: 'São Paulo',
          cep: '00000-000',
          password: '12345678',
          whatsapp: '00000000000',
        }),
    ).rejects.toBeInstanceOf(UsersAlreadyExistsError)
  })

  it('should be able to register', async () => {
    const { organization } = await sut.execute({
      responsible: 'John Doe',
      email: 'johndoe@example.com',
      address: 'Rua dos Bobos, 0',
      city: 'São Paulo',
      cep: '00000-000',
      password: '12345678',
      whatsapp: '00000000000',
    })

    expect(organization.id).toEqual(expect.any(String))
  })
})
