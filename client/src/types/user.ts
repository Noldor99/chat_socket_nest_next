export interface IUsers {
  totalCount: number
  users: IUser[]
}

export interface IUser {
  id: string
  username: string
  surname: string
  email: string
  roles: TRole[]
  password: string
  color?: string
  createdAt: string
  updatedAt: string
}

export enum RolesEnum {
  ADMIN = 'ADMIN',
  MODER = 'MODER',
}

export type TRole = {
  id: number
  value: RolesEnum
  description: string
}
