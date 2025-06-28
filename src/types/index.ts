export enum RoleType {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export interface RoleTypeProps {
  roleType: RoleType
}

export enum PageType {
  NEW = 'NEW',
  EDIT = 'EDIT',
  LIST = 'LIST',
  DETAIL = 'DETAIL'
}

export interface PageTypeProps {
  pageType: PageType
}

export type Project = {
  id: string
  title: string
  summary: string
  skills: string[]
  rate: number
  deadlineAt: Date
}
