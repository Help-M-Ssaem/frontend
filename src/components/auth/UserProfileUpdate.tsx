'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useUserInfo } from '@/service/user/useUserService'
import MbtiSelect from './MbtiSelect'

const UserProfileUpdate = () => {
  const { data: profile } = useUserInfo()

  const [profileImgUrl, setProfileImgUrl] = useState('')
  const [nickName, setNickName] = useState('')
  const [mbti, setMbti] = useState<string[]>(['', '', '', ''])
  const [introduction, setIntroduction] = useState<string | undefined>('')

  useEffect(() => {
    if (profile) {
      setProfileImgUrl(profile.profileImgUrl)
      setNickName(profile.nickName)
      setMbti([
        profile.mbti[0],
        profile.mbti[1],
        profile.mbti[2],
        profile.mbti[3],
      ])
      setIntroduction(profile.introduction)
    }
  }, [profile])

  const handleMbtiChange = (index: number, selectedMbti: string) => {
    const updatedMbti = [...mbti]
    updatedMbti[index] = selectedMbti
    setMbti(updatedMbti)
  }

  if (!profile) return null

  return (
    <div className="flex flex-col items-center justify-center gap-4 max-w-80">
      {profile && (
        <>
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="relative w-[194px] h-[194px]">
              <Image
                src={profileImgUrl}
                alt="profile"
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div className="text-gray1 underline cursor-pointer">
              프로필 설정
            </div>
          </div>

          <div className="flex flex-col gap-2 self-start w-full">
            <div className="text-title3 text-gray1 font-semibold">닉네임</div>
            <input
              value={nickName}
              onChange={(e) => setNickName(e.target.value)}
              className="w-full border border-gray4 bg-white p-2.5 rounded-1.25 focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-2 self-start">
            <div className="text-title3 text-gray1 font-semibold">MBTI</div>
            <div className="flex justify-between align-center gap-2">
              <MbtiSelect
                options={['E', 'e', 'I', 'i']}
                onSelect={(selected) => handleMbtiChange(0, selected)}
              />
              <MbtiSelect
                options={['S', 's', 'N', 'n']}
                onSelect={(selected) => handleMbtiChange(1, selected)}
              />
              <MbtiSelect
                options={['T', 't', 'F', 'f']}
                onSelect={(selected) => handleMbtiChange(2, selected)}
              />
              <MbtiSelect
                options={['J', 'j', 'P', 'p']}
                onSelect={(selected) => handleMbtiChange(3, selected)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 self-start w-full">
            <div className="text-title3 text-gray1 font-semibold">
              한 줄 소개
            </div>
            <input
              value={introduction}
              onChange={(e) => setIntroduction(e.target.value)}
              className="w-full border border-gray4 bg-white p-2.5 rounded-1.25 focus:outline-none"
            />
          </div>
        </>
      )}
    </div>
  )
}

export default UserProfileUpdate
