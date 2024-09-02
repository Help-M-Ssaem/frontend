'use client'

import Service from '@/apis/AxiosInstance'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const KakaoLogin = () => {
  const router = useRouter()
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const service = new Service()

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

        if (res.data.code === 'MEMBER_002') {
          // 에러 코드가 MEMBER_002일 경우 이메일을 localStorage에 저장하고 회원가입 페이지로 이동
          localStorage.setItem('email', res.data.message)
          router.push('/signin/terms')
        } else if (res.data.accessToken) {
          // 정상적으로 토큰을 받은 경우 /로 리다이렉트
          localStorage.setItem('access_token', res.data.accessToken)
          service.setAuthorizationHeader(res.data.accessToken) // 생성된 서비스 인스턴스의 헤더 설정
          router.push('/')
        } else {
          // 토큰이 없을 경우에 /signin/terms로 리다이렉트
          router.push('/signin/terms')
        }
      } catch (error) {
        console.error('Error during Kakao login:', error)
        router.push('/signin/terms')
      }
    }

    getToken()
  }, [router, service])

  return null
}

export default KakaoLogin
