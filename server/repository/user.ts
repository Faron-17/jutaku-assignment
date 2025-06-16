import type { Prisma, Users, Role } from '@prisma/client'
import { prisma } from '~/prisma/prismaClient'

export const userRepository = {
  async create(data: Prisma.UsersCreateInput): Promise<Users> {
    return prisma.users.create({
      data
    })
  },
  async findMany(): Promise<Users[]> {
    return prisma.users.findMany({
      orderBy: { id: 'asc' }
    })
  },
  async findUnique(id: string): Promise<Users | null> {
    return prisma.users.findUnique({
      where: { id }
    })
  },
  async findByRole({
    id,
    role
  }: { id: string; role: Role }): Promise<Users | null> {
    return prisma.users.findFirst({
      where: {
        id,
        role
      }
    })
  },
  async update({
    id,
    data
  }: {
    id: string
    data: Prisma.UsersUpdateInput
  }): Promise<Users> {
    return prisma.users.update({
      where: { id },
      data
    })
  },
  async delete(id: string): Promise<Users> {
    return prisma.users.delete({
      where: { id }
    })
  }
}
