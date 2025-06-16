import { ProjectList } from '@/app/_component/ProjectList'
import { RoleType } from '@/types'

export default function AdminProjects() {
  return <ProjectList roleType={RoleType.ADMIN} />
}
