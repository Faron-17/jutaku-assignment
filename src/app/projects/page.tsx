import { ProjectList } from '@/app/_component/ProjectList'
import { RoleType } from '@/types'

export default function Projects() {
  return <ProjectList roleType={RoleType.USER} />
}
