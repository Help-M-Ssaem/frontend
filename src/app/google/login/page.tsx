'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useSetRecoilState } from 'recoil'
import { userInfoState } from '@/recoil/UserInfo'
import UserService from '@/service/user/UserService'

const GoogleLogin = () => {
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
        const res = await axios.post(`${API_BASE_URL}/google/login`, {
          idToken: AUTHORIZATION_CODE,
        })

        if (res.data.accessToken) {
          // 정상적으로 토큰을 받은 경우 /로 리다이렉트
          localStorage.setItem('access_token', res.data.accessToken)
          await fetchUserInfo()
          router.push('/')
        } else {
          // 에러 코드가 MEMBER_002일 경우 이메일을 localStorage에 저장하고 회원가입 페이지로 이동
          const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
          const email = res.data.message.match(emailPattern)

          localStorage.setItem('email', email)

          // 토큰이 없을 경우에 /signin/terms로 리다이렉트
          router.push('/signin/terms')
        }
      } catch (error) {
        console.error('Error during login:', error)
        router.push('/signin/terms')
      }
    }

    getToken()
  }, [router])

  return null
}

export default GoogleLogin
