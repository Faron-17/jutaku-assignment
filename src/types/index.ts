export enum RoleType {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export interface RoleTypeProps {
  roleType: RoleType
}

export enum PageType {
  NEW = 'NEW',
  EDIT = 'EDIT'
}

export interface PageTypeProps {
  pageType: PageType
}
