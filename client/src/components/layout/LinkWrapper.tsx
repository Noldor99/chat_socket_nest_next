"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { type ReactNode } from "react"

import { cn } from "@/lib/utils"

type LinkWrapperPropsType = {
  children: ReactNode
  url: string
  onClick?: () => void
}

export const LinkWrapper = ({
  children,
  url,
  onClick,
}: LinkWrapperPropsType) => {
  const pathname = usePathname()
  return (
    <Link
      className={cn("text-h2 xl:text-s", pathname === url && "font-bold")}
      href={url}
      onClick={onClick}
    >
      {children}
    </Link>
  )
}
