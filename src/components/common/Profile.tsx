'use client'

import { useRouter } from 'next/navigation'
import { User } from '@/model/User'
import Image from 'next/image'
import Button from './Button'

export interface ProfileProps {
  user: User
  createdAt?: string
}

const Profile = ({ user, createdAt }: ProfileProps) => {
  const router = useRouter()
  const handleProfileClick = () => {
    router.push(`/user/${user.id}`)
  }

  return (
    <div
      className="flex items-center gap-4.5 cursor-pointer"
      onClick={handleProfileClick}
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
        <div className="flex items-center gap-2">
          <div className="text-headline font-semibold">{user.nickName} 님</div>
          {createdAt && (
            <div className="text-gray2 text-caption">{createdAt}</div>
          )}
        </div>
        <div className="flex gap-2.5">
          <Button text={user.mbti} color={user.mbti} size="badge" />
          {user.badge && <Button text={user.badge} size="badge" />}
        </div>
      </div>
    </div>
  )
}

Profile.defaultProps = {
  createdAt: undefined,
}

export default Profile
