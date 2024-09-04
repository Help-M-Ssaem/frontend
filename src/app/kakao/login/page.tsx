'use client'

import { userInfoState } from '@/recoil/UserInfo'
import UserService from '@/service/user/UserService'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

const KakaoLogin = () => {
  const router = useRouter()
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const setUserInfo = useSetRecoilState(userInfoState)

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
    const getToken = async () => {
      const AUTHORIZATION_CODE = new URL(window.location.href).searchParams.get(
        'code',
      )
      if (!AUTHORIZATION_CODE) {
        console.error('Authorization Code is missing')
        return
      }

      try {
        const res = await axios.post(`${API_BASE_URL}/kakao/login`, {
          idToken: AUTHORIZATION_CODE,
        })

        if (res.data.accessToken) {
          // 정상적으로 토큰을 받은 경우 /로 리다이렉트
          localStorage.setItem('access_token', res.data.accessToken)
          await fetchUserInfo()
          router.push('/')
        } else {
          // 에러 코드가 MEMBER_002일 경우 이메일을 localStorage에 저장하고 회원가입 페이지로 이동
          localStorage.setItem('email', res.data.message)
          // 토큰이 없을 경우에 /signin/terms로 리다이렉트
          router.push('/signin/terms')
        }
      } catch (error) {
        console.error('Error during Kakao login:', error)
        router.push('/signin/terms')
      }
    }

    getToken()
  }, [router])

  return null
}

export default KakaoLogin
