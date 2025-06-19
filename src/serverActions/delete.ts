'use server'

import { serverApi } from '~/lib/trpc/server-api'

export async function deleteProject(id: string) {
  const api = serverApi()
  try {
    await api.projects.delete(id)
  } catch (error) {
    return { error }
  }
}
