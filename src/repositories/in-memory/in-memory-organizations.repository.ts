import { Organization, Prisma } from '@prisma/client'
import { OrganizationsRepository } from '../organizations.repository'
import { randomUUID } from 'node:crypto'

export class InMemoryOrganizationsRepository
  implements OrganizationsRepository
{
  public items: Organization[] = []

  async findByEmail(email: string) {
    const organization = this.items.find((item) => item.email === email)

    if (!organization) {
      return null
    }

    return organization
  }

  async create(data: Prisma.OrganizationCreateInput) {
    const organization = {
      id: randomUUID(),
      email: data.email,
      responsible: data.responsible,
      address: data.address,
      cep: data.cep,
      password: data.password,
      whatsapp: data.whatsapp,
    }

    this.items.push(organization)

    return organization
  }
}
