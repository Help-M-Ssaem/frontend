'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { User } from '@/model/User'
import Button from '../common/Button'
import { motion } from 'framer-motion'
import { FadeInAnimation } from '@/styles/animation'

export interface PopularProfileProps {
  popularProfile: User
}

const PopularProfile = ({ popularProfile }: PopularProfileProps) => {
  const { id, nickName, mbti, badge, profileImgUrl, introduction } =
    popularProfile
  const router = useRouter()

  return (
    <motion.div
      className="flex flex-col items-center gap-2 sm:gap-4 cursor-pointer"
      onClick={() => {
        router.push(`/user/${id}`)
      }}
      initial="hidden"
      animate="visible"
      variants={FadeInAnimation}
      transition={{ duration: 0.2 }}
    >
      <div className="relative w-[100px] h-[100px] sm:w-[144px] sm:h-[144px] md:w-[174px] md:h-[174px]">
        <Image
          src={profileImgUrl}
          alt="profile"
          fill
          className="rounded-full object-cover"
        />
      </div>
      <div className="flex flex-col items-center gap-0.5 sm:gap-2.5">
        <div className="text-title3 sm:text-title1 text-maindark font-bold">
          {nickName} 님
        </div>
        <div className="flex gap-1 sm:gap-2.5">
          <Button text={mbti} color={mbti} size="badge" />
          {badge && <Button text={badge} color={badge} size="badge" />}
        </div>
      </div>
      <div className="text-footnote sm:text-body text-gray1 font-regular">
        {introduction}
      </div>
    </motion.div>
  )
}

export default PopularProfile
