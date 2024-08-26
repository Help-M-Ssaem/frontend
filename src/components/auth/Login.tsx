'use client'

import { User } from '@/model/User'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ContainerAnimation } from '@/styles/animation'
import Profile from '../user/Profile'

export interface LoginProps {
  user: User
}

const Login = ({ user }: LoginProps) => {
  const router = useRouter()
  const { id, profileImgUrl, nickName, mbti, badge } = user

  const menuItems = [
    { id: 'chat', label: 'M쌤 채팅', path: '/chatting' },
    { id: 'notification', label: '알림', path: '/#' },
    { id: 'activity', label: '활동', path: '/#' },
    { id: 'profile', label: '프로필 설정', path: `/user/${id}` },
  ]

  return (
    <motion.div
      className="flex flex-col justify-between items-center w-full min-h-full min-w-67.5 p-7 bg-white rounded-7.5"
      initial="hidden"
      animate="visible"
      variants={ContainerAnimation}
      transition={{ duration: 0.2 }}
    >
      <div className="w-full flex justify-end">
        <p className="text-gray2 text-caption cursor-pointer">로그아웃</p>
      </div>
      <div className="flex flex-col gap-4 items-center">
        <Profile user={{ id, profileImgUrl, nickName, mbti, badge }} />
        <ul className="flex justify-center w-full text-gray2 text-caption">
          {menuItems.map((item, index) => (
            <li key={item.id} className="flex items-center">
              <button
                type="button"
                className="whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer bg-transparent border-none p-0 m-0"
                onClick={() => router.push(item.path)}
              >
                {item.label}
              </button>
              {index < menuItems.length - 1 && <span className="mx-2">|</span>}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

export default Login
