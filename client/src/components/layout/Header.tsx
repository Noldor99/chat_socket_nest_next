"use client"

import { useAuthLogout } from "@/hooks/useAuth"
import { useUserStore } from "@/store"
import { IconLogout } from "@tabler/icons-react"

export const Header = () => {
  const { user } = useUserStore()
  const { mutate: logout } = useAuthLogout()

  return (
    <header className="text-s sticky top-0 z-50 w-full border-b-2 border-black bg-white py-4 xl:py-8">
      <div className="container">
        <div className="flex items-center gap-4 justify-between xl:gap-8">
          <p>{user?.username}</p>
          <IconLogout className="cursor-pointer" onClick={() => logout()} />
        </div>
      </div>
    </header>
  )
}
