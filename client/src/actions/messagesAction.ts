import { z } from 'zod'
import { api } from '@/lib/axios'

import { AxiosResponse } from 'axios'
import { IMessage } from '@/types/messages';

export const MessageSchema = z.object({
  roomId: z.string().trim().optional(),

  currentUserName: z
    .string()
    .trim()
    .min(3, {
      message: 'Name must be at least 3 characters long',
    })
    .max(255, {
      message: 'Name must be less than 255 characters long',
    }).optional(),

  currentUserId: z.string().trim().optional(),

  message: z
    .string()
    .trim()
    .min(1, {
      message: 'Message must not be empty',
    }),
});


export type MessageSchemaType = z.infer<typeof MessageSchema>


export interface MessageApi {
  create: (body: MessageSchemaType) => Promise<IMessage>;
  getAll: (roomId: string) => Promise<IMessage[]>;
}

export const messageApi: MessageApi = {
  create: (body) => api.post('/messages', body).then(qw),
  getAll: (roomId) => api.get(`/messages${roomId}`).then(qw),
};


const qw = <T>(response: AxiosResponse<T>): T => response.data;