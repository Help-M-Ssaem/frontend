'use client'

import React, { useState, useEffect } from 'react'
import MbtiSelect from '@/components/auth/MbtiSelect'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import { usePostSignup } from '@/service/auth/useAuthService'
import { useRouter } from 'next/navigation'
import UserService from '@/service/user/UserService'
import { useSetRecoilState } from 'recoil'
import { userInfoState } from '@/recoil/UserInfo'
import { useToast } from '@/hooks/useToast'

const Info = () => {
  const [nickName, setNickName] = useState('')
  const [mbti, setMbti] = useState<string[]>(['E', 'S', 'T', 'J'])
  const [email, setEmail] = useState('')
  const router = useRouter()
  const setUserInfo = useSetRecoilState(userInfoState)
  const { showToast } = useToast()

  const { mutate: postSignup } = usePostSignup()

  const fetchUserInfo = async () => {
    try {
      const response = await UserService.fetchUserInfo()
      if (response.data) {
        setUserInfo(response.data)
      }
    } catch (error) {
      console.error('Failed to load user info:', error)
    }
  }

  useEffect(() => {
    const storedEmail = localStorage.getItem('email')
    if (storedEmail) {
      setEmail(storedEmail)
    }
  }, [])

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value)
  }

  const handleMbtiChange = (index: number, selectedMbti: string) => {
    const updatedMbti = [...mbti]
    updatedMbti[index] = selectedMbti
    setMbti(updatedMbti)
  }

  const handleSignupClick = () => {
    const upperMbti = mbti.map((char) => char.toUpperCase()).join('')
    const caseSensitivity = mbti
      .map((char) => (char === char.toLowerCase() ? '0' : '1'))
      .join('')
    postSignup(
      { email, nickName, mbti: upperMbti, caseSensitivity },
      {
        onSuccess: async () => {
          await fetchUserInfo()
          showToast('회원가입이 완료되었습니다. 로그인해주세웅~')
          router.push('/signin')
        },
      },
    )
  }

  return (
    <div className="flex flex-col items-start my-18 w-full max-w-95 mx-auto gap-10">
      <div className="w-full text-center">
        <div className="text-maindark text-title1 font-bold">
          유저 정보 입력
        </div>
      </div>

      <div className="flex flex-col gap-5 w-full">
        <div className="text-gray2 text-headline font-semibold">
          M쌤에서 사용할 닉네임을 입력해주세요.
        </div>
        <Input
          value={nickName}
          onChange={handleNicknameChange}
          placeholder="닉네임"
          color="gray"
          size="medium"
        />
      </div>

      <div className="flex flex-col gap-5 w-full">
        <div className="text-gray2 text-headline font-semibold">
          당신의 MBTI는 무엇인가요?
        </div>
        <div className="flex justify-between align-center gap-2">
          <MbtiSelect
            options={['E', 'e', 'I', 'i']}
            selectedOption={mbti[0]}
            onSelect={(selected) => handleMbtiChange(0, selected)}
          />
          <MbtiSelect
            options={['S', 's', 'N', 'n']}
            selectedOption={mbti[1]}
            onSelect={(selected) => handleMbtiChange(1, selected)}
          />
          <MbtiSelect
            options={['T', 't', 'F', 'f']}
            selectedOption={mbti[2]}
            onSelect={(selected) => handleMbtiChange(2, selected)}
          />
          <MbtiSelect
            options={['J', 'j', 'P', 'p']}
            selectedOption={mbti[3]}
            onSelect={(selected) => handleMbtiChange(3, selected)}
          />
        </div>
      </div>

      <Button
        text="회원가입"
        color="GRAY"
        size="login"
        onClick={handleSignupClick}
        disabled={nickName === ''}
        className={`${nickName !== '' ? 'bg-main2' : ''}`}
      />
    </div>
  )
}

export default Info
