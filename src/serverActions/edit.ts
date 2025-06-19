'use server'

import type { Projects } from '@prisma/client'
import { serverApi } from '~/lib/trpc/server-api'

export async function editProject(data: Projects) {
  const api = serverApi()
  return api.projects.update(data)
}
