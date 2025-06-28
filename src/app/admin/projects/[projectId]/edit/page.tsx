import { Title } from '@mantine/core'
import { InputForm } from '@/app/admin/projects/_component/InputForm'
import { PageType } from '@/types'
import { redirect } from 'next/navigation'
import { serverApi } from '~/lib/trpc/server-api'
import { AFTER_NOT_SIGNIN_PATH_ADMIN } from '@/const/config'

export default async function EditProject({
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
        案件編集
      </Title>
      {project ? (
        <InputForm pageType={PageType.EDIT} project={project} />
      ) : (
        <p>案件を読み込めませんでした</p>
      )}
    </>
  )
}
