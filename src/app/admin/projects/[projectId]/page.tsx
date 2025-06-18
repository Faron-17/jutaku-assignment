import ProjectDetails from '@/app/admin/projects/[projectId]/_component/ProjectDetails'
import { AFTER_NOT_SIGNIN_PATH_ADMIN } from '@/const/config'
import { Title } from '@mantine/core'
import { redirect } from 'next/navigation'
import { serverApi } from '~/lib/trpc/server-api'
import { formatDate } from '~/util'

export default async function AdminProjectDetail({
  params
}: {
  params: { projectId: string }
}) {
  const projectId = params.projectId
  const api = serverApi()

  // ユーザー認証
  const user = await api
    .adminInfo()
    .catch(() => redirect(AFTER_NOT_SIGNIN_PATH_ADMIN))
  if (!user) redirect(AFTER_NOT_SIGNIN_PATH_ADMIN)

  // プロジェクトの取得
  const project = await api.projects.find(projectId).catch(() => null)

  return (
    <>
      <Title order={2} ta="center" mb="lg">
        案件詳細
      </Title>
      {project ? (
        <ProjectDetails
          project={project}
          deadline={formatDate(project.deadlineAt)}
        />
      ) : (
        <p>案件を取得できませんでした。</p>
      )}
    </>
  )
}
