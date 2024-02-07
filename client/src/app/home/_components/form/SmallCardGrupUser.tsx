import { cn } from "@/lib/utils"
import React from "react"

interface SmallCardUserProps {
  text: string
  icon?: React.ReactElement
  handleClick?: () => void
}

const SmallCardGrupUser: React.FC<SmallCardUserProps> = (props) => {
  const { text, icon, handleClick } = props

  return (
    <div
      className={cn(
        "border border-solid border-black",
        "bg-yellow rounded-[32px] px-2 shadow-md"
      )}
      onClick={handleClick}
    >
      <div className="flex items-center space-x-2">
        <span className="font-semibold">{text}</span>
        {icon && <div className="ml-1 hover:text-white">{icon}</div>}
      </div>
    </div>
  )
}

export default SmallCardGrupUser
