'use server'

import { AFTER_ADMIN_SIGNUP_FOR_DB_REGISTER_PATH } from '@/const/config'
import { redirect } from 'next/navigation'
import { serverApi } from '~/lib/trpc/server-api'

export async function deleteProject(id: string) {
  const api = serverApi()
  try {
    await api.projects.delete(id)
  } catch (error) {
    return { error }
  }
  redirect(AFTER_ADMIN_SIGNUP_FOR_DB_REGISTER_PATH)
}
