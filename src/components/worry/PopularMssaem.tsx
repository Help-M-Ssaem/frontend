'use client'

import Image from 'next/image'
import { User } from '@/model/User'
import Button from '../common/Button'

export interface PopularMssaemProps {
  popularMssaem: User
}

const PopularMssaem = ({ popularMssaem }: PopularMssaemProps) => {
  const { nickName, mbti, badge, profileImgUrl, introduction } = popularMssaem

  return (
    <div className="flex flex-col items-center gap-4">
      <Image src={profileImgUrl} alt="profile" width={194} height={194} />
      <div className="flex flex-col items-center gap-2.5">
        <div className="text-title1 text-maindark font-bold">{nickName} 님</div>
        <div className="flex gap-2.5">
          <Button text={mbti} color={mbti} size="badge" />
          <Button text={badge} color={badge} size="badge" />
        </div>
      </div>
      <div className="text-body text-gray1 font-regular">{introduction}</div>
    </div>
  )
}

export default PopularMssaem
