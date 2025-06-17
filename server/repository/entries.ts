import type { Prisma, Entries } from '@prisma/client'
import { prisma } from '~/prisma/prismaClient'

export const entriesRepository = {
  async findMany(id: string): Promise<Entries[] | null> {
    return prisma.entries.findMany({
      where: { userId: id },
      distinct: ['projectId']
    })
  },
  async create(data: { projectId: string; userId: string }): Promise<Entries> {
    return prisma.entries.create({
      data: {
        project: {
          connect: {
            id: data.projectId
          }
        },
        user: {
          connect: {
            id: data.userId
          }
        }
      }
    })
  }
}
