'use client'

import Image from 'next/image'
import Button, { MBTI } from '../common/Button'

export interface WorryProfileProps {
  profileImgUrl: string
  nickName: string
  strFromMbti: MBTI
  strToMbti: MBTI
}

const WorryProfile = ({
  profileImgUrl,
  nickName,
  strFromMbti,
  strToMbti,
}: WorryProfileProps) => {
  return (
    <div className="flex items-center gap-4.5">
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
        <div className="text-headline font-semibold">{nickName} 님</div>
        <div className="flex gap-2.5">
          <Button text={strFromMbti} color={strFromMbti} size="badge" />
          <Image
            src="/images/worry/arrow_right.svg"
            alt="arrow_right"
            width={18}
            height={7}
          />
          <Button text={strToMbti} color={strToMbti} size="badge" />
        </div>
      </div>
    </div>
  )
}

export default WorryProfile
