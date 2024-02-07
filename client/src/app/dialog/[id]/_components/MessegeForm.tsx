"use client"

import { MessageSchema, MessageSchemaType } from "@/actions/messagesAction"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { useId } from "react"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import FormInput from "@/components/form/FormInput"
import { useUserStore } from "@/store"
import { Socket } from "socket.io-client"

interface MessegeFormProps {
  groupid?: string
  socket: Socket
}

const MessegeForm = ({ groupid, socket }: MessegeFormProps) => {
  const form = useForm<MessageSchemaType>({
    mode: "onChange",
    resolver: zodResolver(MessageSchema),
    defaultValues: {
      message: "",
    },
  })

  const { user } = useUserStore()

  const { formState, handleSubmit, reset } = form

  const onSubmit = (data: MessageSchemaType) => {
    const requestData: any = {
      roomId: groupid,
      currentUserId: user?.id,
      currentUserName: user?.username,
    }

    for (const key in data) {
      const value = data[key as keyof MessageSchemaType]

      if (formState.dirtyFields[key as keyof MessageSchemaType]) {
        requestData[key] = value
      }
    }
    socket.emit("meeting", { roomId: groupid })
    socket.emit("send-message", requestData)

    reset()
  }

  const formId = useId()

  return (
    <div className="paper-rounded">
      <div className="my-2 flex items-center justify-center gap-2">
        <Form {...form}>
          <form
            className="flex flex-col space-y-2 w-full"
            onSubmit={handleSubmit(onSubmit)}
            id={formId}
          >
            <FormInput name="message" placeholder="message" />

            <Button type="submit" className="mt-6" form={formId}>
              Save
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default MessegeForm
