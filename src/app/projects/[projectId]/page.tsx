import { ProjectDetails } from '@/app/projects/[projectId]/_component/ProjectDetails'
import { RoleType } from '@/types'
import { Box, Button, Title } from '@mantine/core'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { serverApi } from '~/lib/trpc/server-api'

export default async function ProjectDetail({
  params
}: {
  params: { projectId: string }
}) {
  const projectId = params.projectId
  const api = serverApi()

  // ユーザー認証
  const user = await api.userInfo().catch(() => redirect('/'))
  if (!user) redirect('/')

  // 管理者権限でのログインの場合はリダイレクト
  const userData = await api.user.find(user.id)
  if (userData?.role === RoleType.ADMIN) redirect('/')

  // プロジェクトの取得
  const project = await api.projects.find(projectId).catch(() => null)

  return (
    <>
      <Title order={2} ta="center" mb="lg">
        案件詳細
      </Title>
      <Box mb="2.5rem" style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          display={'block'}
          type="button"
          component={Link}
          href="/projects"
          style={{ width: '7rem' }}
        >
          戻る
        </Button>
      </Box>
      {project ? (
        <ProjectDetails project={project} userId={user.id} />
      ) : (
        <p>プロジェクトを取得できませんでした。</p>
      )}
    </>
  )
}
