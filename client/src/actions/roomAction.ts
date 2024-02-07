import { z } from 'zod'
import { api } from '@/lib/axios'

import { AxiosResponse } from 'axios'
import { IRoom } from '@/types/room';

export const RoomSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, {
      message: 'name must be at least 3 characters long',
    })
    .max(255, {
      message: 'name must be less than 255 characters long',
    }),

  users: z.array(
    z.object({
      id: z.string().optional(),
      username: z.string(),
    })
  ),
});

export type RoomSchemaType = z.infer<typeof RoomSchema>

export type TQueryRoomParams = {
  page?: number;
  limit?: number;
}

export type TConnectRoom = {
  idUserOrGroop?: string;
}

export interface RoomApi {
  createGroupChat: (body: RoomSchemaType) => Promise<IRoom>;
  editGroupChat: (groupId: string, data: RoomSchemaType) => Promise<IRoom>;
  getAllGroups: (params: TQueryRoomParams) => Promise<IRoom[]>;
  connectToRoom: (body: TConnectRoom) => Promise<IRoom>;
  getRoomById: (roomId: string) => Promise<IRoom>
}

export const roomApi: RoomApi = {
  createGroupChat: (body) => api.post('/rooms/createGroupChat', body).then(qw),
  editGroupChat: (groupId, body) => api.patch(`/rooms/editGroupChat/${groupId}`, body).then(qw),
  getAllGroups: (params) => api.get('/rooms', { params }).then(qw),
  connectToRoom: (body) => api.post('/rooms/connectToRoom', body).then(qw),
  getRoomById: (roomId) => api.get(`/rooms/${roomId}`).then(qw),
};

const qw = <T>(response: AxiosResponse<T>): T => response.data;