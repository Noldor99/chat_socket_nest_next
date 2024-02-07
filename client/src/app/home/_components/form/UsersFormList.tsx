import WrapSearch from "@/components/WrapSearch"
import { IconClipboardPlus, IconX } from "@tabler/icons-react"
import React, { useEffect, useState } from "react"
import SmallCardUser from "../SmallCardUser"
import { useGetUsers } from "@/hooks/useUsers"
import { useSearchParams } from "next/navigation"
import CollapsibleButton from "@/components/CollapsibleButton"
import SmallCardGrupUser from "./SmallCardGrupUser"
import { useFieldArray, useFormContext } from "react-hook-form"
import { FormField, FormItem } from "@/components/ui/form"
import { useUserStore } from "@/store"
import { IUsers } from "@/types/user"

const UsersFormList = () => {
  const searchParams = useSearchParams()

  const form = useFormContext()

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "users",
  })

  const { user } = useUserStore()

  const [users, setUsers] = useState<IUsers>()

  const { data, isFetched, refetch } = useGetUsers({
    params: {
      limit: "6",
      page: searchParams.get("page") || "1",
      search: searchParams.get("search") || undefined,
    },
  })

  useEffect(() => {
    refetch()
    setUsers(data)
  }, [refetch, searchParams])

  const handleAppend = (item: any) => {
    append(item)
    setUsers((prevUsers) => {
      if (!prevUsers) return prevUsers

      return {
        ...prevUsers,
        users: prevUsers.users.filter((u) => u.id !== item.id),
      }
    })
  }

  return (
    <div>
      <div className="flex flex-col px-6  gap-3">
        <CollapsibleButton>
          {fields.map((user, index) => (
            <div key={user.id} className="flex items-center gap-2">
              <FormField
                control={form.control}
                name={`users.${index}.username`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <SmallCardGrupUser
                      text={form.watch(`users.${index}.username`)}
                      icon={<IconX size="15px" onClick={() => remove(index)} />}
                    />
                  </FormItem>
                )}
              />
            </div>
          ))}
        </CollapsibleButton>
        <WrapSearch />
        {users?.users.map(
          (item, idx) =>
            item.username !== user?.username && (
              <SmallCardUser
                key={idx}
                text={item.username}
                icon={
                  <IconClipboardPlus
                    onClick={() =>
                      handleAppend({
                        id: item.id,
                        username: item.username,
                      })
                    }
                  />
                }
              />
            )
        )}
      </div>
    </div>
  )
}

export default UsersFormList
