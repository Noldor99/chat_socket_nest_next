"use client"

import { useRouter } from "next/navigation"
import React, { useEffect } from "react"

const page = () => {
  const router = useRouter()
  useEffect(() => {
    router.push("/home")
  }, [])

  return <></>
}

export default page
