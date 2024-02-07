import { AxiosResponse } from 'axios';
import { z } from 'zod';
import { api } from '@/lib/axios';
import { IUser, IUsers } from '@/types/user';



const UpdateUseSchema = z.object({
  username: z.string().trim().optional(),
  password: z.string().trim().min(8, {
    message: 'The password must take 8 characters',
  }),
  userId: z.string(),
});

type UpdateUseSchemaType = z.infer<typeof UpdateUseSchema>;

export interface QueryUserParams {
  page?: string;
  limit?: string;
  search?: string
}

interface UsersApi {
  getUsers: (params: QueryUserParams) => Promise<IUsers>;
  getUserById: (id: string) => Promise<IUser>;

}

export const usersApi: UsersApi = {
  getUsers: (params) => api.get('/users', { params }).then(qw),
  getUserById: (id: string) => api.get(`/users/${id}`).then(qw),
};



const qw = <T>(response: AxiosResponse<T>) => response.data