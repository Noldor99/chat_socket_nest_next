"use client"

import * as z from "zod"

import { IconSearch } from "@tabler/icons-react"
import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useDebounce } from "@/hooks/useDebounce"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"

const searchSchema = z.object({
  search: z.string().optional().nullable().default(""),
})

const WrapSearch = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const { register, watch, reset } = useForm<z.infer<typeof searchSchema>>({
    mode: "onChange",
    defaultValues: searchSchema.parse({}),
  })

  const debouncedValue = useDebounce<string>(watch("search") ?? "", 300)

  useEffect(() => {
    const params = new URLSearchParams(searchParams)

    if (debouncedValue) {
      params.set("search", debouncedValue)
      params.set("page", "1")
    } else {
      params.delete("search")
      params.set("page", "1")
    }

    router.push(`${pathname}?${params.toString()}`)
  }, [debouncedValue])

  return (
    <div
      className={cn(
        "flex flex-1 items-center justify-start",
        "border-b-2 border-l border-r-2 border-t border-black"
      )}
    >
      <IconSearch className="mx-2" />
      <input
        type="text"
        className={cn(
          "px-3 py-1 mt-0 w-full",
          "border-none outline-none bg-transparent"
        )}
        placeholder="Find"
        {...register("search")}
        autoComplete="new-password"
      />
    </div>
  )
}

export default WrapSearch
