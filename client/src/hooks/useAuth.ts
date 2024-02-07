import { usePathname, useRouter } from 'next/navigation'

import { useEffect } from 'react'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { useUserStore } from '@/store'
import { authApi } from '@/actions/authAction'

export const useAuthRefresh = ({ enabled = true }: { enabled?: boolean }) => {
  const { push } = useRouter()
  const pathname = usePathname()

  const { setUser } = useUserStore()
  const query = useQuery({
    queryKey: ['user', 'refresh'],
    queryFn: authApi.refresh,
    enabled,
  })
  const { isError, isSuccess, isFetched, data } = query

  useEffect(() => {
    if (isFetched) {
      if (isError) {
        setUser(null)
      }
      if (isSuccess) {
        setUser(data)
      }
    }
  }, [isError, isSuccess, isFetched, data, setUser, push, pathname])

  return query
}


export const useRegistration = () => {
  const { push } = useRouter()
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: authApi.registration,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      push('/login')
    },
  })
  return mutation
}

export const useAuthLogin = () => {
  const { push } = useRouter()
  const { setUser } = useUserStore()
  const mutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      setUser(data)
      push('/home')
    },
  })

  return mutation
}

export const useAuthLogout = () => {
  const { push } = useRouter()
  const { setUser } = useUserStore()
  const mutation = useMutation({
    mutationFn: authApi.logout,
    onSettled: () => {
      setUser(null)
      push('/admin')
    },
  })

  return mutation
}


