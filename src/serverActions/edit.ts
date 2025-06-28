'use server'

import type { Project } from '@/types'
import { serverApi } from '~/lib/trpc/server-api'

export async function editProject(data: Project) {
  const api = serverApi()
  return api.projects.update(data)
}
