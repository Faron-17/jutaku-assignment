import { router } from '~/lib/trpc/trpc'
import { userProcedure } from '../middleware'
import { projectsRepository } from '../repository/projects'
import { z } from 'zod'

export const projectsRouter = router({
  list: userProcedure.query(async () => {
    return await projectsRepository.findMany()
  }),
  listNot: userProcedure.input(z.array(z.string())).query(async ({ input }) => {
    return await projectsRepository.findManyNot(input)
  })
})
