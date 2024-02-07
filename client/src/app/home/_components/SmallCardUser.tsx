import { cn } from "@/lib/utils"
import React from "react"

interface SmallCardUserProps {
  text: string
  iconConect?: React.ReactElement
  icon?: React.ReactElement
  handleClick?: () => void
}

const SmallCardUser: React.FC<SmallCardUserProps> = (props) => {
  const { text, iconConect, icon, handleClick } = props

  return (
    <div
      className={cn(
        "border border-solid border-black",
        "bg-none rounded-md p-4 shadow-md"
        // "hover:bg-primary hover:text-white"
      )}
      onClick={handleClick}
    >
      <div className="flex items-center justify-between space-x-2">
        <span className="font-semibold">{text}</span>
        <div className="flex gap-2">
          {iconConect && (
            <div className=" hover:text-primary">{iconConect}</div>
          )}
          {icon && <div className=" hover:text-primary">{icon}</div>}
        </div>
      </div>
    </div>
  )
}

export default SmallCardUser
