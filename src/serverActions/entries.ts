'use server'

import { serverApi } from '~/lib/trpc/server-api'

export async function createEntry({
  projectId,
  userId
}: {
  projectId: string
  userId: string
}) {
  const api = serverApi()
  return api.entries.create({
    projectId,
    userId
  })
}
