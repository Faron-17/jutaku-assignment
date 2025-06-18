'use server'

import { serverApi } from '~/lib/trpc/server-api'

type NewProjectInput = {
  title: string
  summary: string
  skills: string[]
  rate: number
  deadlineAt: Date
}

export async function createProject(data: NewProjectInput) {
  const api = serverApi()
  return api.projects.create(data)
}
