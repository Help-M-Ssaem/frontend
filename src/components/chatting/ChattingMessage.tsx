import { ChattingMessageI } from '@/model/Chatting'
import { User } from '@/model/User'
import { useUserInfo } from '@/service/user/useUserService'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export interface ChattingMessageProps {
  other: User
  msg: ChattingMessageI
}

const ChattingMessage = ({ other, msg }: ChattingMessageProps) => {
  const { message, timestamp, memberId } = msg
  const { data: userInfo } = useUserInfo()
  const [isMine, setIsMine] = useState(false)

  useEffect(() => {
    if (userInfo && memberId === userInfo.id.toString()) {
      setIsMine(true)
    } else {
      setIsMine(false)
    }
  }, [userInfo, memberId])

  return (
    <div
      className={`flex items-end ${isMine ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`flex items-center gap-2.5 ${isMine ? 'flex-row-reverse' : 'flex-row'}`}
      >
        {!isMine && (
          <Image
            src={other.profileImgUrl}
            width={50}
            height={50}
            alt="profile"
            className="rounded-full"
          />
        )}
        <div
          className={`flex items-end gap-2 ${isMine ? 'flex-row-reverse' : 'flex-row'}`}
        >
          <div
            className={`text-headline text-gray2 font-semibold rounded-7.5 px-5 py-4 max-w-90 ${isMine ? 'bg-main4' : 'bg-white border border-main'}`}
          >
            {message}
          </div>
          <div className="text-caption text-gray2 whitespace-nowrap">
            {timestamp}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChattingMessage
