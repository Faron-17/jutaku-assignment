'use server'

import { serverApi } from '~/lib/trpc/server-api'
import type { Project } from '@/types'

export async function createProject(data: Omit<Project, 'id'>) {
  const api = serverApi()
  return api.projects.create(data)
}
