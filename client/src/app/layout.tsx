import { type Metadata } from "next"
import { Space_Mono } from "next/font/google"

import { type ReactNode } from "react"

import { Providers } from "@/components/Providers"
import { LayoutWrapper } from "@/components/layout/LayoutWrapper"

import "@/app/globals.css"

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  preload: true,
  variable: "--space-mono",
})

export const metadata: Metadata = {
  title: "Chat",
  description: "chat",
}

type RootLayoutPropsT = {
  children: ReactNode
}

const RootLayout = async ({ children }: RootLayoutPropsT) => {
  return (
    <html lang="en">
      <body className={`flex min-h-screen flex-col ${spaceMono.className}`}>
        <Providers>
          <div className="fixed left-0 right-0 top-0 z-[-1]">
            <div className="h-[80vh] bg-background blur-[90px] filter"></div>
          </div>
          <LayoutWrapper>{children}</LayoutWrapper>
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
