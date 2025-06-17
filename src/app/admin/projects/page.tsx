import { ProjectList } from '@/app/_component/ProjectList'
import { RoleType } from '@/types'
import { serverApi } from '~/lib/trpc/server-api'
import { redirect } from 'next/navigation'
import { AFTER_NOT_SIGNIN_PATH_ADMIN } from '@/const/config'

export default async function AdminProjects() {
  const api = serverApi()

  // ユーザー認証
  const user = await api
    .adminInfo()
    .catch(() => redirect(AFTER_NOT_SIGNIN_PATH_ADMIN))
  if (!user) redirect(AFTER_NOT_SIGNIN_PATH_ADMIN)

  // プロジェクトの取得
  const projects = await api.projects.list().catch(() => null)

  if (!projects || projects.length === 0) {
    return <p>データがありませんでした。</p>
  }

  return <ProjectList roleType={RoleType.ADMIN} projects={projects} />
}
