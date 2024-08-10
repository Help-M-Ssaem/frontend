'use client'

import { User } from '@/model/User'
import { useRouter } from 'next/navigation'
import Profile from '../common/Profile'

const menuItems = [
  { id: 'chat', label: 'M쌤 채팅', path: '/chat' },
  { id: 'notification', label: '알림', path: '/notifications' },
  { id: 'activity', label: '활동', path: '/activity' },
  { id: 'profile', label: '프로필 설정', path: '/profile-settings' },
]

const Login = ({ profileImgUrl, nickName, mbti, badge }: User) => {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center w-68 h-full px-7 py-8 bg-white rounded-7.5">
      <div className="w-full flex justify-end">
        <p className="text-gray2 text-caption cursor-pointer">로그아웃</p>
      </div>
      <div className="flex flex-col gap-4">
        <Profile user={{ profileImgUrl, nickName, mbti, badge }} />
        <ul className="flex justify-between w-full text-gray2 text-caption">
          {menuItems.map((item, index) => (
            <div key={item.id} className="flex items-center">
              <button
                type="button"
                className="whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer bg-transparent border-none p-0 m-0"
                onClick={() => router.push(item.path)}
              >
                {item.label}
              </button>
              {index < menuItems.length - 1 && <span className="mx-2">|</span>}
            </div>
          ))}
        </ul>
      </div>
    </div>
  )
}

Login.defaultProps = {
  badge: undefined,
}

export default Login
