import { IMessage } from "./messages"
import { IUser } from "./user"

export type IRooms = IRoom[]

export interface IRoom {
  id: string
  usersId: string
  name: string
  users: IUser[]
  messages: IMessage[]
}

