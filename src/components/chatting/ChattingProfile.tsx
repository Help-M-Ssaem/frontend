'use client'

import Image from 'next/image'
import { User } from '@/model/User'
import Button from '../common/Button'

export interface ChattingProfileProps {
  user: User
  lastMessage: string
  lastSendAt: string
  onClick: () => void
  current: boolean
}

const ChattingProfile = ({
  user,
  lastMessage,
  lastSendAt,
  onClick,
  current,
}: ChattingProfileProps) => {
  const truncatedMessage =
    lastMessage.length > 10 ? `${lastMessage.slice(0, 10)}...` : lastMessage

  return (
    <div
      className={`flex items-center gap-4.5 cursor-pointer p-4 ${
        current ? 'bg-main4' : ''
      }`}
      onClick={onClick}
    >
      <div className="w-14 h-14 relative rounded-full overflow-hidden">
        <Image
          src={user.profileImgUrl}
          alt="profile"
          className="w-full h-full object-cover"
          width={40}
          height={40}
        />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2.5">
          <div className="text-headline font-semibold text-maindark">
            {user.nickName} 님
          </div>
          <div className="flex gap-2.5">
            <Button text={user.mbti} color={user.mbti} size="badge" />
            {user.badge && <Button text={user.badge} size="badge" />}
          </div>
          {lastSendAt && (
            <div className="text-gray2 text-caption">{lastSendAt}</div>
          )}
        </div>
        <div className="text-body text-maindark">{truncatedMessage}</div>
      </div>
    </div>
  )
}

export default ChattingProfile
