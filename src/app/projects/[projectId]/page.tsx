import { ProjectDetails } from '@/app/projects/[projectId]/_component/ProjectDetails'
import { Box, Button, Title } from '@mantine/core'
import Link from 'next/link'

export default function ProjectDetail() {
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
          href="/admin/projects"
          style={{ width: '7rem' }}
        >
          戻る
        </Button>
      </Box>
      <ProjectDetails />
    </>
  )
}
