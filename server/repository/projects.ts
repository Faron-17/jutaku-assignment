import type { Prisma, Projects } from '@prisma/client'
import { prisma } from '~/prisma/prismaClient'

export const projectsRepository = {
  async findManyNot(entriesProjects?: string[]): Promise<Projects[]> {
    return prisma.projects.findMany({
      where: {
        id: {
          notIn: entriesProjects
        }
      },
      orderBy: { createdAt: 'desc' }
    })
  }
}
