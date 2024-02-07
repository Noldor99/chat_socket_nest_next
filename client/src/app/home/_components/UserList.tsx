"use client"

import WrapPagination from "@/components/WrapPagination"
import { useGetUsers } from "@/hooks/useUsers"
import { IconCloudHeart, IconPlugConnected } from "@tabler/icons-react"
import { useRouter, useSearchParams } from "next/navigation"
import SmallCardUser from "./SmallCardUser"
import WrapSearch from "@/components/WrapSearch"
import { useEffect } from "react"
import { useUserStore } from "@/store"

export const UserList = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const {
    data: users,
    isFetched,
    refetch,
  } = useGetUsers({
    params: {
      limit: "6",
      page: searchParams.get("page") || "1",
      search: searchParams.get("search") || undefined,
    },
  })

  const { user } = useUserStore()

  useEffect(() => {
    refetch()
  }, [refetch, searchParams])

  return (
    <div className="py-1">
      <div className=" flex w-full max-w-[800px] flex-col items-center justify-start gap-2">
        <WrapSearch />
        <div className="flex flex-col px-6 py-2 w-[250px] gap-3">
          {users?.users.map(
            (item, idx) =>
              item.username !== user?.username && (
                <SmallCardUser
                  key={idx}
                  handleClick={() => router.push(`dialog/${item.id}`)}
                  text={item.username}
                  icon={<IconPlugConnected />}
                />
              )
          )}
        </div>
        {users && users.totalCount > 6 && (
          <div className="mt-1">
            <WrapPagination totalCount={users!.totalCount} />
          </div>
        )}
      </div>
    </div>
  )
}
