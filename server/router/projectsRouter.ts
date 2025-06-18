import { router } from '~/lib/trpc/trpc'
import { adminProcedure, userProcedure } from '../middleware'
import { projectsRepository } from '../repository/projects'
import { z } from 'zod'
import { TRPCError } from '@trpc/server'

export const projectsRouter = router({
  list: userProcedure.query(async () => {
    return await projectsRepository.findMany()
  }),
  listNot: userProcedure.input(z.array(z.string())).query(async ({ input }) => {
    return await projectsRepository.findManyNot(input)
  }),
  find: userProcedure.input(z.string()).query(async ({ input }) => {
    return await projectsRepository.findUnique(input)
  }),
  create: userProcedure
    .input(
      z.object({
        title: z.string(),
        summary: z.string(),
        skills: z.array(z.string()),
        rate: z.coerce.number(),
        deadlineAt: z.date()
      })
    )
    .mutation(async ({ input }) => {
      return await projectsRepository.create(input)
    }),
  update: userProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        summary: z.string(),
        skills: z.array(z.string()),
        rate: z.coerce.number(),
        deadlineAt: z.date()
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input
      const project = await projectsRepository.findUnique(input.id)
      if (!project) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Project not found'
        })
      }

      return await projectsRepository.update({
        data: input
      })
    }),
  delete: adminProcedure.input(z.string()).mutation(async ({ input }) => {
    return await projectsRepository.delete(input)
  })
})
