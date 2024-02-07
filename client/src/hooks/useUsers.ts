import { useQuery } from '@tanstack/react-query'

import { QueryUserParams, usersApi } from '@/actions/userAction'

export const useGetUsers = ({
  enabled = true,
  params,
}: {
  enabled?: boolean
  params?: QueryUserParams
}) =>
  useQuery({
    queryKey: ['users'],
    queryFn: () => usersApi.getUsers(params ?? {}),
    enabled
  })

export const useGetUserById = (id: string) =>
  useQuery({
    queryKey: ['users', id],
    queryFn: () => usersApi.getUserById(id),
  })

