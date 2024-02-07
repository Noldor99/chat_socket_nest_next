"use client"

import { useId } from "react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"

import FormInput from "@/components/form/FormInput"

import { toast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"

import { AxiosError } from "axios"
import { IRoom } from "@/types/room"
import { RoomSchema, RoomSchemaType } from "@/actions/roomAction"
import { useCreateRoom, useUpdateRoom } from "@/hooks/useRooms"
import UsersFormList from "./UsersFormList"

type RoomFormPropsType = {
  room?: IRoom
}

export const RoomForm = ({ room }: RoomFormPropsType) => {
  const form = useForm<RoomSchemaType>({
    mode: "onChange",
    resolver: zodResolver(RoomSchema),
    defaultValues: {
      name: room?.name || "",
      users: room?.users || [],
    },
  })

  const { formState, handleSubmit } = form
  const { mutateAsync: createRoom, isPending: pendingRoom } = useCreateRoom()
  const { mutateAsync: updateProjects, isPending: pendingUpdate } =
    useUpdateRoom(room?.id || "")
  const isPending = pendingRoom || pendingUpdate

  const onSubmit = (data: RoomSchemaType) => {
    const payload: any = {}

    for (const key in data) {
      const value = data[key as keyof RoomSchemaType]

      if (formState.dirtyFields) {
        payload[key] = value
      }
    }

    const mutation = room ? updateProjects : createRoom

    mutation(payload, {
      onSuccess: (data) => {
        toast({ title: "Success", description: data.name })
      },
      onError: (error) => {
        const errorMessage =
          ((error as AxiosError)?.response?.data as { message: string })
            ?.message || "Unknown error"

        toast({ title: "Error", description: errorMessage })
      },
    })
  }

  const formId = useId()

  return (
    <section className="container">
      <div className="my-2 mb-[40px] flex items-center justify-center gap-2">
        <Form {...form}>
          <form
            className="flex flex-col space-y-2"
            onSubmit={handleSubmit(onSubmit)}
            id={formId}
          >
            <div className="flex items-start justify-between gap-4">
              <FormInput name="name" placeholder="Room name" />
            </div>
            <UsersFormList />
            <div className="mx-auto max-w-[800px]">
              <Button
                type="submit"
                className="mt-6"
                form={formId}
                disabled={
                  isPending ||
                  (!form.formState.isDirty && form.formState.isValid)
                }
              >
                {room ? "Edit project" : "Save project"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  )
}
