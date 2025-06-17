'use server'

import { serverApi } from '~/lib/trpc/server-api'

type UpdateProjectInput = {
  id: string
  title: string
  summary: string
  skills: string[]
  rate: number
  deadlineAt: Date
}

export async function editProject(data: UpdateProjectInput) {
  const api = serverApi()
  return api.projects.update(data)
}
