import { Organization, Prisma } from '@prisma/client'

export interface OrganizationsRepository {
  findByEmail(email: string): Promise<Organization | null>
  findById(id: string): Promise<Organization | null>
  findManyByCity(city: string): Promise<Organization[]>
  create(organization: Prisma.OrganizationCreateInput): Promise<Organization>
}
