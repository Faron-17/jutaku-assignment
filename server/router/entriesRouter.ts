import { router } from '~/lib/trpc/trpc'
import { userProcedure } from '../middleware'
import { entriesRepository } from '../repository/entries'
import { z } from 'zod'

export const entriesRouter = router({
  list: userProcedure.input(z.string()).query(async ({ input }) => {
    return await entriesRepository.findMany(input)
  }),

  create: userProcedure
    .input(
      z.object({
        projectId: z.string(),
        userId: z.string()
      })
    )
    .mutation(async ({ input }) => {
      return await entriesRepository.create({
        projectId: input.projectId,
        userId: input.userId
      })
    })
})
