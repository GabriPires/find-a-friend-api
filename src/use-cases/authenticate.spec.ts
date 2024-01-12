import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations.repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials.error'

let organizationsRepository: InMemoryOrganizationsRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new AuthenticateUseCase(organizationsRepository)
  })

  it('should be able to authenticate', async () => {
    await organizationsRepository.create({
      responsible: 'John Doe',
      email: 'johndoe@email.com',
      password: await hash('12345678', 6),
      address: 'Rua 1, 123',
      city: 'São Paulo',
      cep: '12345-123',
      whatsapp: '123456789',
    })

    const { organization } = await sut.execute({
      email: 'johndoe@email.com',
      password: '12345678',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@email.com',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await organizationsRepository.create({
      responsible: 'John Doe',
      email: 'johndoe@email.com',
      password: await hash('12345678', 6),
      address: 'Rua 1, 123',
      city: 'São Paulo',
      cep: '12345-123',
      whatsapp: '123456789',
    })

    await expect(() =>
      sut.execute({
        email: 'johndoe@email.com',
        password: '123123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
