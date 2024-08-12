'use client'

import Image from 'next/image'
import { User } from '@/model/User'
import Button from '../common/Button'

export interface UserProfileProps {
  profile: User
}

const UserProfile = ({ profile }: UserProfileProps) => {
  const { nickName, mbti, badge, profileImgUrl, introduction } = profile

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-[194px] h-[194px]">
        <Image
          src={profileImgUrl}
          alt="profile"
          fill
          className="rounded-full object-cover"
        />
      </div>
      <div className="flex flex-col items-center gap-2.5">
        <div className="text-title1 text-maindark font-bold">{nickName} 님</div>
        <div className="flex gap-2.5">
          <Button text={mbti} color={mbti} size="badge" />
          <Button text={badge} color={badge} size="badge" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-title3 text-gray1 items-start font-semibold">
          한 줄 소개
        </div>
        <div className="text-body text-gray1 font-regular">{introduction}</div>
      </div>
    </div>
  )
}

export default UserProfile
