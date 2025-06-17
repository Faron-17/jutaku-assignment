import { ProjectList } from '@/app/_component/ProjectList'
import { RoleType } from '@/types'
import { serverApi } from '~/lib/trpc/server-api'
import { redirect } from 'next/navigation'

export default async function Projects() {
  const api = serverApi()

  // ユーザー認証
  const user = await api.userInfo().catch(() => redirect('/'))
  if (!user) redirect('/')

  // エントリーしたプロジェクトのID取得
  const projectIds =
    (await api.entries.list(user.id))?.map((e) => e.projectId) ?? []

  // エントリーしていないプロジェクトの取得
  const yetEntryProjects = await api.projects.list(projectIds).catch(() => null)

  if (!yetEntryProjects || yetEntryProjects.length === 0) {
    return <p>データがありませんでした。</p>
  }

  return <ProjectList roleType={RoleType.USER} projects={yetEntryProjects} />
}
