"use client"

import { Button } from "@/components/ui/button"
import { useConnectToRoom } from "@/hooks/useRooms"
import React, { useEffect, useState } from "react"
import MessegeForm from "./MessegeForm"
import { IMessage } from "@/types/messages"
import { io } from "socket.io-client"
import { useRouter } from "next/navigation"
import SmallCardMessege from "./SmallCardMessege"
import { useUserStore } from "@/store"
import { ScrollArea } from "@/components/ui/scroll-area"

const socket = io("http://localhost:7777", {
  transports: ["websocket", "polling", "flashsocket"],
})

socket.on("meeting", function (data) {
  console.log("you have joined the meeting: ", data)
})

interface RoomChatProps {
  id: string
}

const RoomChat = ({ id }: RoomChatProps) => {
  const router = useRouter()

  const { mutate, data, isPending } = useConnectToRoom()
  const [messages, setMessages] = useState<IMessage[]>([])

  const [groupid, setGroupid] = useState<string | undefined>()

  const { user } = useUserStore()

  useEffect(() => {
    mutate({ idUserOrGroop: id })
  }, [])

  useEffect(() => {
    setGroupid(data?.id)

    if (data) {
      setMessages(data?.messages)
    }
  }, [data])

  useEffect(() => {
    socket.on("receive-message", (message: IMessage) => {
      console.log(message)
      receivedMessage(message)
    })

    return () => {
      setMessages([])
    }
  }, [])

  const receivedMessage = (message: IMessage) => {
    setMessages((prev) => {
      if (prev.some((item) => item.id === message.id)) {
        return prev
      }

      return [...prev, message]
    })
  }

  return (
    <div>
      <section className="flex-1">
        <div className="container mt-6">
          <div className="flex flex-col paper-sharp mb-[40px] gap-4 max-w-[400px] m-auto">
            <div className="paper-rounded">
              <Button variant="black" onClick={() => router.back()}>
                Back
              </Button>
            </div>
            <div className="flex flex-col gap-4 mt-2  ">
              <ScrollArea className="h-[400px] w-[350px] rounded-md border p-4">
                {data &&
                  messages?.map((item) => (
                    <SmallCardMessege
                      key={item?.id}
                      messege={item}
                      color={user?.color}
                      currentid={user?.id}
                      username={item?.currentUserName}
                    />
                  ))}
              </ScrollArea>
            </div>
            <MessegeForm groupid={groupid} socket={socket} />
          </div>
        </div>
      </section>
    </div>
  )
}

export default RoomChat
