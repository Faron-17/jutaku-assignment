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

export async function getEntry({
  projectId
}: {
  projectId: string
}) {
  const api = serverApi()
  const entryList = await api.entries.findManyByProjectId(projectId)
  if (entryList) {
    const userList = entryList.map((item) => item.userId)
    const users = await api.user.findById(userList)
    return users.map((user) => {
      return { id: user.id, name: user.username }
    })
  }
  return [{ id: '', name: '' }]
}
