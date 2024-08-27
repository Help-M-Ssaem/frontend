'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Button, { MBTI } from '../common/Button'

export interface WorryProfileProps {
  userId: number
  profileImgUrl: string
  nickName: string
  strFromMbti: MBTI
  strToMbti: MBTI
}

const WorryProfile = ({
  userId,
  profileImgUrl,
  nickName,
  strFromMbti,
  strToMbti,
}: WorryProfileProps) => {
  const router = useRouter()

  const handleProfileClick = () => {
    router.push(`/user/${userId}`)
  }

  return (
    <div
      className="flex items-center gap-2.5 sm:gap-4 cursor-pointer"
      onClick={handleProfileClick}
    >
      <div className="w-12 h-12 sm:w-14 sm:h-14 relative rounded-full overflow-hidden">
        <Image
          src={profileImgUrl}
          alt="profile"
          className="w-full h-full object-cover"
          width={40}
          height={40}
        />
      </div>

      <div className="flex flex-col gap-1">
        <div className="text-headline font-semibold text-maindark">
          {nickName} 님
        </div>
        <div className="flex gap-1 sm:gap-2.5">
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
