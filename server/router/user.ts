import { z } from 'zod'
import { router } from '~/lib/trpc/trpc'
import { userRepository } from '../repository/user'
import { userProcedure } from '../middleware'
import { Role } from '@prisma/client'

export const userRouter = router({
  list: userProcedure.query(async () => {
    return await userRepository.findMany()
  }),
  find: userProcedure.input(z.string()).query(async ({ input }) => {
    return await userRepository.findUnique(input)
  }),
  create: userProcedure
    .input(
      z.object({
        username: z.string(),
        email: z.string().email(),
        password: z.string(),
        role: z.nativeEnum(Role)
      })
    )
    .mutation(async ({ input, ctx: { userId } }) => {
      console.log('create', { userId, input })
      // 認証プロバイダー（supabase）のユーザーIDを指定して作成
      return await userRepository.create({ id: userId, ...input })
    }),
  update: userProcedure
    .input(
      z.object({
        id: z.string(),
        username: z.string(),
        email: z.string().email()
      })
    )
    .mutation(async ({ input }) => {
      return await userRepository.update({
        id: input.id,
        data: input
      })
    }),
  delete: userProcedure.input(z.string()).mutation(async ({ input }) => {
    return await userRepository.delete(input)
  })
})
