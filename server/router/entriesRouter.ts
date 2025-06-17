import { router } from '~/lib/trpc/trpc'
import { userProcedure } from '../middleware'
import { entriesRepository } from '../repository/entries'
import { z } from 'zod'

export const entriesRouter = router({
  list: userProcedure.input(z.string()).query(async ({ input }) => {
    return await entriesRepository.findMany(input)
  })
})
