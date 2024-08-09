'use client'

import Image from 'next/image'
import { ChattingProfileI } from '@/model/Chatting'
import Button from '../common/Button'

export interface ChattingProfileProps {
  chattingProfile: ChattingProfileI
  onClick: () => void
}

const ChattingProfile = ({
  chattingProfile,
  onClick,
}: ChattingProfileProps) => {
  const { nickName, mbti, badge, profileImgUrl, recent, lastMessage } =
    chattingProfile

  return (
    <div className="flex items-center gap-4.5 cursor-pointer" onClick={onClick}>
      <div className="w-14 h-14 relative rounded-full overflow-hidden">
        <Image
          src={profileImgUrl}
          alt="profile"
          className="w-full h-full object-cover"
          width={40}
          height={40}
        />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2.5">
          <div className="text-headline font-semibold">{nickName} 님</div>
          <div className="flex gap-2.5">
            <Button text={mbti} color={mbti} size="badge" />
            {badge && <Button text={badge} size="badge" />}
          </div>
          {recent && (
            <div className="text-gray2 text-caption">{recent}분 전</div>
          )}
        </div>
        <div className="text-body text-maindark">{lastMessage}</div>
      </div>
    </div>
  )
}

export default ChattingProfile
