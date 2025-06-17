import type { Prisma, Entries } from '@prisma/client'
import { prisma } from '~/prisma/prismaClient'

export const entriesRepository = {
  async findMany(id: string): Promise<Entries[] | null> {
    return prisma.entries.findMany({
      where: { userId: id },
      distinct: ['projectId']
    })
  }
}
