import { ProjectDetails } from '@/app/projects/[projectId]/_component/ProjectDetails'
import { Box, Button, Title } from '@mantine/core'
import Link from 'next/link'
import { serverApi } from '~/lib/trpc/server-api'

export default async function ProjectDetail({
  params
}: {
  params: { projectId: string }
}) {
  const projectId = params.projectId
  const api = serverApi()

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
        <ProjectDetails project={project} />
      ) : (
        <p>プロジェクトを取得できませんでした。</p>
      )}
    </>
  )
}
