import type { Prisma, Projects } from '@prisma/client'
import { prisma } from '~/prisma/prismaClient'

export const projectsRepository = {
  async findMany(): Promise<Projects[]> {
    return prisma.projects.findMany({
      orderBy: { createdAt: 'desc' }
    })
  },
  async findManyNot(entriesProjects?: string[]): Promise<Projects[]> {
    return prisma.projects.findMany({
      where: {
        id: {
          notIn: entriesProjects
        }
      },
      orderBy: { createdAt: 'desc' }
    })
  },
  async findUnique(id: string): Promise<Projects | null> {
    return prisma.projects.findUnique({
      where: { id }
    })
  },
  async update({
    data
  }: {
    data: Prisma.ProjectsUpdateInput
  }): Promise<Projects> {
    return prisma.projects.update({
      where: { id: data.id as string },
      data
    })
  }
}
