"use client"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"

type Tag = {
  _id: string
  text: string
}

type CollapsibleTagsPropsType = {
  tags: Tag[]
  searchParams: {
    tags?: string[]
  }
}

export function ToggleMultiple({
  tags,
  searchParams,
}: CollapsibleTagsPropsType) {
  const router = useRouter()
  const pathname = usePathname()
  const [isTagsChanged, setIsTagsChanged] = useState<string[] | undefined>([])

  const [value, setValue] = useState<string[]>(searchParams.tags || [])

  useEffect(() => {
    if (JSON.stringify(isTagsChanged) !== JSON.stringify(searchParams.tags)) {
      const params = new URLSearchParams()

      if (value.length > 0) {
        params.set("tags", value.join(","))
      }

      setIsTagsChanged(searchParams.tags)

      router.push(`${pathname}?${params.toString()}`)
    }
  }, [value, searchParams, isTagsChanged, pathname, router])

  return (
    <ToggleGroup
      type="multiple"
      className="flex flex-wrap items-start justify-start gap-2"
      value={value}
      //@ts-ignore
      onValueChange={(newValue) => {
        if (newValue) {
          setValue(newValue)
          setIsTagsChanged(newValue)
        }
      }}
    >
      {tags.map((tag) => (
        <ToggleGroupItem
          className="h-6 border border-b-2 border-r-2 border-solid border-muted px-2 py-1 text-black data-[state=on]:border-black data-[state=on]:text-white"
          key={tag._id}
          value={tag.text}
        >
          {tag.text}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}
