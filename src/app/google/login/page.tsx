'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const GoogleLogin = () => {
  const router = useRouter()
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

  useEffect(() => {
    const getToken = async () => {
      const AUTHORIZATION_CODE = new URL(window.location.href).searchParams.get('code')
      if (!AUTHORIZATION_CODE) {
        console.error('Authorization Code is missing')
        return
      }

      try {
        const res = await axios.post(`${API_BASE_URL}/google/login`, { idToken: AUTHORIZATION_CODE })
        if (res.data.code === 'MEMBER_002') {
          localStorage.setItem('email', res.data.message)
          router.push('/signin/terms')
        } else if (res.data.accessToken) {
          localStorage.setItem('access_token', res.data.accessToken)
          router.push('/')
        } else {
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
