'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useToast } from '@/hooks/useToast'
import { ContainerAnimation } from '@/styles/animation'
import Button from '../common/Button'

const menuItems = [
  { id: '/findId', label: '아이디 찾기', path: '/findId' },
  { id: '/findPw', label: '비밀번호 찾기', path: '/findPw' },
  { id: '/signup', label: '회원가입', path: '/signup' },
]

const NotLogin = () => {
  const router = useRouter()
  const { showToast } = useToast()

  const handleMenuClick = (path: string) => {
    if (path === '/findId' || path === '/findPw') {
      showToast('준비 중인 기능입니다')
    } else {
      router.push(path)
    }
  }

  return (
    <motion.div
      className="flex flex-col gap-3.25 items-center w-full min-w-67.5 h-full px-7 py-8 bg-white rounded-7.5"
      initial="hidden"
      animate="visible"
      variants={ContainerAnimation}
      transition={{ duration: 0.3 }}
    >
      <p className="text-gray1 text-caption cursor-pointer">
        M쌤이 되어 더 자유롭게 이용하세요
      </p>
      <Button
        text="로그인하고 이용하기"
        color="LIGHTPURPLE"
        size="small"
        onClick={() => {
          router.push('/signin')
        }}
      />
      <ul className="flex justify-center w-full text-gray2 text-caption">
        {menuItems.map((item, index) => (
          <li key={item.id} className="flex items-center">
            <button
              type="button"
              className="whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer bg-transparent border-none p-0 m-0"
              onClick={() => handleMenuClick(item.path)}
            >
              {item.label}
            </button>
            {index < menuItems.length - 1 && <span className="mx-2">|</span>}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export default NotLogin
