'use client'

import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { userInfoState } from '@/recoil/UserInfo'
import UserService from './UserService'

const LoadUserInfo = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState)

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await UserService.fetchUserInfo()
        setUserInfo(response.data)
      } catch (error) {
        console.error('Failed to load user info:', error)
      }
    }

    if (!userInfo) {
      fetchUserInfo()
    }
  }, [userInfo, setUserInfo])

  return null
}

export default LoadUserInfo
