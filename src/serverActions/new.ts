'use server'

import { serverApi } from '~/lib/trpc/server-api'
import type { Projects } from '@prisma/client'

export async function createProject(data: Projects) {
  const api = serverApi()
  return api.projects.create(data)
}
