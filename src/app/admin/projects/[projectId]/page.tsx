import ProjectDetails from '@/app/admin/projects/[projectId]/_component/ProjectDetails'
import { Title } from '@mantine/core'

export default function AdminProjectDetail() {
  return (
    <>
      <Title order={2} ta="center" mb="lg">
        案件詳細
      </Title>
      <ProjectDetails />
    </>
  )
}
