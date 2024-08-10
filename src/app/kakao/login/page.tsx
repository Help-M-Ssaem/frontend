'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const KakaoLogin = () => {
  const router = useRouter()
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

  useEffect(() => {
    const getToken = async () => {
      const AUTHORIZATION_CODE = new URL(window.location.href).searchParams.get(
        'code',
      )
      if (!AUTHORIZATION_CODE) {
        Error('Authorization Code is missing')
        return
      }

      try {
        const res = await axios.post(`${API_BASE_URL}/kakao/login`, {
          idToken: AUTHORIZATION_CODE,
        })

        if (res.data.code === 'AUTH_005') {
          // 에러 코드가 AUTH_005일 경우 회원가입
          router.push('/signin/terms')
        } else if (res.data.accessToken) {
          // 정상적으로 토큰을 받은 경우 /로 리다이렉트
          localStorage.setItem('access_token', res.data.accessToken)
          router.push('/')
        } else {
          // 토큰이 없을 경우에도 /signin/terms로 리다이렉트
          router.push('/signin/terms')
        }
      } catch (error) {
        router.push('/signin/terms')
      }
    }

    getToken()
  }, [router])

  return null
}

export default KakaoLogin
