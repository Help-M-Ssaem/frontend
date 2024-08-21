'use client'

import Container from '@/components/common/Container'
import { useParams, useRouter } from 'next/navigation'
import { useProfile, usePatchProfile } from '@/service/user/useUserService'
import Button from '@/components/common/Button'
import UserUpdateProfile from '@/components/auth/UserProfileUpdate'

const UserUpdatePage = () => {
  const { id } = useParams()
  const profileId = Number(id)
  const router = useRouter()

  const { data: profile } = useProfile(Number(profileId))
  const { mutate: patchProfile } = usePatchProfile()

  if (!profile) return null

  return (
    <>
      <div className="text-title3 text-maindark font-semibold mt-6 mb-4">
        {profile.teacherInfo.nickName} 프로필 수정
      </div>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        <Container color="purple" className="col-span-1 items-center">
          <UserUpdateProfile />
        </Container>
        <Container color="purple" className="col-span-1">
          <div className="text-title3 text-gray1 items-start font-semibold mb-2.5">
            수집한 칭호
          </div>
          <div className="flex flex-wrap gap-2.5 ">
            {profile.badgeInfos.map((badge, index) => (
              <Button
                key={index}
                text={badge.name}
                color={badge.name}
                size="badge"
              />
            ))}
          </div>
        </Container>
      </div>

      <div className="flex justify-end gap-2.5 my-4">
        <Button
          color="LIGHTPURPLE"
          text="취소하기"
          size="medium"
          onClick={() => {
            router.back()
          }}
        />
        <Button color="PURPLE" text="수정하기" size="medium" />
      </div>
    </>
  )
}

export default UserUpdatePage
