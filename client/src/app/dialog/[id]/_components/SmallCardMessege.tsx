import { cn } from "@/lib/utils"
import { IMessage } from "@/types/messages"
import moment from "moment"
import React from "react"

interface SmallCardUserProps {
  messege: IMessage
  color?: string
  currentid?: string
  username?: string
}

const SmallCardMessege: React.FC<SmallCardUserProps> = ({
  messege,
  color,
  currentid,
  username,
}) => {
  return (
    <div
      className={cn(
        "w-[200px]",
        currentid === messege.currentUserId && "ml-auto"
      )}
    >
      <div>{username}</div>
      <div
        className={cn(
          "border border-solid border-black",
          color ? `border-${color}` : "border-black",
          "bg-none rounded-md p-4 shadow-md",
          "hover:bg-primary hover:text-white"
        )}
      >
        <div className="flex items-center space-x-2">
          <span className="font-semibold">{messege.message}</span>
        </div>
      </div>
      <div>
        <span>{moment(messege.createdAt).format("lll")}</span>
      </div>
    </div>
  )
}

export default SmallCardMessege
