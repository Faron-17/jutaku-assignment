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

  // エントリーしたプロジェクトのID取得
  const projectIds =
    (await api.entries.list(user.id))?.map((e) => e.projectId) ?? []

  // エントリーしていないプロジェクトの取得
  const yetEntryProjects = await api.projects.list(projectIds).catch(() => null)

  if (!yetEntryProjects || yetEntryProjects.length === 0) {
    return <p>データがありませんでした。</p>
  }

  return <ProjectList roleType={RoleType.ADMIN} projects={yetEntryProjects} />
}
