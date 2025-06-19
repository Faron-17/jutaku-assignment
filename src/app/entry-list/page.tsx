import { Title } from '@mantine/core'
import { EntryProjectList } from '@/app/entry-list/_component/EntryProjectList'
import { serverApi } from '~/lib/trpc/server-api'
import { redirect } from 'next/navigation'
import { RoleType } from '@/types'

export default async function EntryList() {
  const api = serverApi()

  // ユーザー認証
  const user = await api.userInfo().catch(() => redirect('/'))
  if (!user) redirect('/')

  // 管理者権限でのログインの場合はリダイレクト
  const userData = await api.user.find(user.id)
  if (userData?.role === RoleType.ADMIN) redirect('/')

  // エントリーしたプロジェクトのID取得
  const projectIds =
    (await api.entries.list(user.id))?.map((e) => e.projectId) ?? []

  // エントリーしていないプロジェクトの取得
  const entryProjects = await api.projects
    .findByProjectIds(projectIds)
    .catch(() => null)

  if (!entryProjects || entryProjects.length === 0) {
    return <p>データがありませんでした。</p>
  }
  return (
    <>
      <Title order={2} ta="center" mb="lg">
        エントリー済み一覧
      </Title>
      <EntryProjectList projects={entryProjects} />
    </>
  )
}
