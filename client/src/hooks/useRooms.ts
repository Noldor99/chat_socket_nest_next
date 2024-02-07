import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { RoomSchemaType, TConnectRoom, TQueryRoomParams, roomApi } from '@/actions/roomAction'


export const useCreateRoom = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: roomApi.createGroupChat,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['room'],
      })
    },
  })
}

export const useUpdateRoom = (id: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: RoomSchemaType) => roomApi.editGroupChat(id!, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['room'],
      })

    },
  })
}

export const useGetRoom = ({
  enabled = true,
  params,
}: {
  enabled?: boolean
  params?: TQueryRoomParams
}) =>
  useQuery({
    queryKey: ['room'],
    queryFn: () => roomApi.getAllGroups(params ?? {}),
    enabled,
  })

export const useGetRoomById = (id: string) =>
  useQuery({
    queryKey: ['room', id],
    queryFn: () => roomApi.getRoomById(id),
    enabled: !!id && id !== 'Add',
  })



export const useConnectToRoom = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: TConnectRoom) => roomApi.connectToRoom(body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['room'],
      })

    },
  })
}