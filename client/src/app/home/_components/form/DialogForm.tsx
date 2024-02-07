"use client"

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { RoomForm } from "./RoomForm"
import { useGetRoomById } from "@/hooks/useRooms"

interface DialogRoomProps {
  id?: string | undefined
}

export function DialogForm({ id }: DialogRoomProps) {
  const { data: room, isFetched } = useGetRoomById(id!)
  console.log(room)
  return (
    <DialogContent className="sm:max-w-[625px]">
      <DialogHeader>
        <DialogTitle>
          {id ? "Edit group chat" : "Create new group chat"}
        </DialogTitle>
      </DialogHeader>
      {id ? isFetched && <RoomForm room={room} /> : <RoomForm />}
    </DialogContent>
  )
}
