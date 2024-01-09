import { OrganizationsRepository } from '@/repositories/organizations.repository'
import { Organization } from '@prisma/client'
import { UsersAlreadyExistsError } from './errors/user-already-exists.error'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  responsible: string
  email: string
  password: string
  cep: string
  address: string
  whatsapp: string
}

interface RegisterUseCaseResponse {
  organization: Organization
}

export class RegisterUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    email,
    password,
    address,
    cep,
    responsible,
    whatsapp,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const userWithSameEmail =
      await this.organizationsRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UsersAlreadyExistsError()
    }

    const passwordHash = await hash(password, 6)

    const organization = await this.organizationsRepository.create({
      email,
      password: passwordHash,
      address,
      cep,
      responsible,
      whatsapp,
    })

    return {
      organization,
    }
  }
}
