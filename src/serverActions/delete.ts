'use server'

import { serverApi } from '~/lib/trpc/server-api'

export async function deleteProject(id: string) {
  const api = serverApi()
  return api.projects.delete(id)
}
