"use client"

import { IconEdit, IconPlugConnected } from "@tabler/icons-react"
import { useRouter, useSearchParams } from "next/navigation"
import SmallCardUser from "./SmallCardUser"
import { useEffect, useState } from "react"
import { useGetRoom } from "@/hooks/useRooms"
import { DialogForm } from "./form/DialogForm"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export const RoomList = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { data: room, isFetched, refetch } = useGetRoom({})

  useEffect(() => {
    refetch()
  }, [refetch, searchParams])

  return (
    <div className="py-2">
      <div className="mt-2 flex w-full max-w-[800px] flex-col items-center justify-start gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default">Create group chat</Button>
          </DialogTrigger>
          <DialogForm />
        </Dialog>
        <div className="flex flex-col px-6 py-2 w-[250px] gap-3">
          {room?.map(
            (item, idx) =>
              item.name !== "simple" && (
                <SmallCardUser
                  key={idx}
                  text={item.name}
                  iconConect={
                    <IconPlugConnected
                      onClick={() => router.push(`dialog/${item.id}`)}
                    />
                  }
                  icon={
                    <Dialog>
                      <DialogTrigger asChild>
                        <IconEdit />
                      </DialogTrigger>
                      <DialogForm id={item.id} />
                    </Dialog>
                  }
                />
              )
          )}
        </div>
      </div>
    </div>
  )
}
