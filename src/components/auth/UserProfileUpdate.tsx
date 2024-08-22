import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useToast } from '@/hooks/useToast'
import {
  useDeleteProfileImg,
  usePostProfileImg,
  useUserInfo,
} from '@/service/user/useUserService'
import MbtiSelect from './MbtiSelect'

interface UserProfileUpdateProps {
  onUpdate: (data: any) => void
}

const UserProfileUpdate = ({ onUpdate }: UserProfileUpdateProps) => {
  const { data: profile } = useUserInfo()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { mutate: postProfileImg } = usePostProfileImg()
  const { mutate: deleteProfileImg } = useDeleteProfileImg()
  const { showToast } = useToast()

  const [profileImgUrl, setProfileImgUrl] = useState<string | null>(null)
  const [nickName, setNickName] = useState<string | null>(null)
  const [mbti, setMbti] = useState<(string | null)[]>([null, null, null, null])
  const [introduction, setIntroduction] = useState<string | null>(null)

  useEffect(() => {
    if (profile) {
      setProfileImgUrl(profile.profileImgUrl || null)
      setNickName(profile.nickName || null)
      setMbti([
        profile.mbti[0] || null,
        profile.mbti[1] || null,
        profile.mbti[2] || null,
        profile.mbti[3] || null,
      ])
      setIntroduction(profile.introduction || null)
    }
  }, [profile])

  useEffect(() => {
    if (profile) {
      const mbtiString = mbti.map((char) => char || '').join('')
      const caseSensitivity = mbti
        .map((char) => (char && char === char.toUpperCase() ? '1' : '0'))
        .join('')

      const updatedData = {
        nickName,
        mbti: mbtiString.toUpperCase() === '' ? null : mbtiString.toUpperCase(),
        caseSensitivity:
          mbtiString.toUpperCase() === '' ? null : caseSensitivity,
        introduction,
        changeImageUrl:
          profileImgUrl === profile.profileImgUrl ? null : profileImgUrl,
      }

      if (
        updatedData.nickName !== profile.nickName ||
        updatedData.mbti !== profile.mbti ||
        updatedData.introduction !== profile.introduction
      ) {
        onUpdate(updatedData)
      }
    }
  }, [profileImgUrl, nickName, mbti, introduction])

  const handleMbtiChange = (index: number, selectedMbti: string | null) => {
    const updatedMbti = [...mbti]
    updatedMbti[index] = selectedMbti
    setMbti(updatedMbti)
  }

  const handleProfileClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const formData = new FormData()
      formData.append('image', file)

      postProfileImg(formData, {
        onSuccess: (uploadedUrl) => {
          setProfileImgUrl(uploadedUrl)
        },
      })
    }
  }

  const handleResetToDefault = () => {
    const currentMbti = mbti
      .map((char) => char || '')
      .join('')
      .toUpperCase()
    const defaultImageUrl = `/images/mbti/${currentMbti}.svg`

    deleteProfileImg(undefined, {
      onSuccess: () => {
        setProfileImgUrl(defaultImageUrl)
      },
      onError: () => {
        showToast('기본 이미지는 삭제할 수 없습니다.')
      },
    })
  }

  if (!profile) return null

  return (
    <div className="flex flex-col items-center justify-center gap-4 max-w-80">
      {profile && (
        <>
          <div className="relative flex flex-col items-center justify-center gap-2">
            <div className="relative w-[194px] h-[194px]">
              <Image
                src={profileImgUrl || ''}
                alt="profile"
                fill
                className="rounded-full object-cover cursor-pointer"
                onClick={handleProfileClick}
              />
              <div
                onClick={handleResetToDefault}
                className="absolute top-0 right-0 bg-main4 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer"
              >
                <span className="text-gray-600 text-title2">&times;</span>
              </div>
            </div>
            <div
              className="text-gray1 underline cursor-pointer"
              onClick={handleProfileClick}
            >
              프로필 설정
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <div className="flex flex-col gap-2 self-start w-full">
            <div className="text-title3 text-gray1 font-semibold">닉네임</div>
            <input
              value={nickName || ''}
              onChange={(e) => setNickName(e.target.value)}
              className="w-full border border-gray4 bg-white p-2.5 rounded-1.25 focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-2 self-start">
            <div className="text-title3 text-gray1 font-semibold">MBTI</div>
            <div className="flex justify-between align-center gap-2">
              <MbtiSelect
                options={['E', 'e', 'I', 'i']}
                selectedOption={mbti[0] || ''}
                onSelect={(selected) => handleMbtiChange(0, selected || null)}
              />
              <MbtiSelect
                options={['S', 's', 'N', 'n']}
                selectedOption={mbti[1] || ''}
                onSelect={(selected) => handleMbtiChange(1, selected || null)}
              />
              <MbtiSelect
                options={['T', 't', 'F', 'f']}
                selectedOption={mbti[2] || ''}
                onSelect={(selected) => handleMbtiChange(2, selected || null)}
              />
              <MbtiSelect
                options={['J', 'j', 'P', 'p']}
                selectedOption={mbti[3] || ''}
                onSelect={(selected) => handleMbtiChange(3, selected || null)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 self-start w-full">
            <div className="text-title3 text-gray1 font-semibold">
              한 줄 소개
            </div>
            <input
              value={introduction || ''}
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
