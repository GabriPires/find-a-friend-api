import { Organization, Prisma } from '@prisma/client'

export interface OrganizationsRepository {
  findByEmail(email: string): Promise<Organization | null>
  create(organization: Prisma.OrganizationCreateInput): Promise<Organization>
}
