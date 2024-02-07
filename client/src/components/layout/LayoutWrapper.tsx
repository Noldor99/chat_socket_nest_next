"use client"

import { useEffect, type ReactNode } from "react"

import { Header } from "@/components/layout/Header"
import { useAuthRefresh } from "@/hooks/useAuth"
import { usePathname, useRouter } from "next/navigation"

type RootLayoutPropsType = {
  children: ReactNode
}

export const LayoutWrapper = ({ children }: RootLayoutPropsType) => {
  const { push } = useRouter()
  const pathname = usePathname()

  const { data: user, isFetched } = useAuthRefresh({
    enabled: true,
  })

  useEffect(() => {
    if (!user && isFetched) {
      push("/login")
    }
  }, [user, push, isFetched])

  return (
    <>
      {pathname.includes("/login") ||
      pathname.includes("/registration") ? null : (
        <Header />
      )}

      {children}
    </>
  )
}
