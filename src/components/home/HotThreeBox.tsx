'use client'

import { useEffect, useState } from 'react'
import { fetchUserInfo } from '@/service/user/fetchUserInfo'
import { useHotThree } from '@/service/home/useHomeService'
import { User } from '@/model/User'
import { HotThreeI } from '@/model/Home'
import HotThree from './HotThree'
import NotLogin from '../auth/NotLogin'
import Login from '../auth/Login'

interface HotThreeBoxProps {
  userInfo: User | null
}

const renderHotThree = (hotThree: HotThreeI) => (
  <>
    <HotThree hotThree={hotThree} board="board" />
    <HotThree hotThree={hotThree} board="discussion" />
    <HotThree hotThree={hotThree} board="worry" />
  </>
)

const HotThreeBox = ({ userInfo: initialUserInfo }: HotThreeBoxProps) => {
  const { data: hotThree } = useHotThree()
  const [userInfo, setUserInfo] = useState<User | null>(initialUserInfo || null)

  useEffect(() => {
    if (!initialUserInfo) {
      const fetchData = async () => {
        const fetchedUserInfo = await fetchUserInfo()
        setUserInfo(fetchedUserInfo)
      }
      fetchData()
    }
  }, [initialUserInfo])

  return (
    <>
      {/* mobile */}
      <div className="bg-main4 flex items-center w-full-vw ml-half-vw gap-5 px-6% py-5 overflow-x-scroll scrollbar-hide sm:hidden">
        {!userInfo ? <NotLogin /> : <Login user={userInfo} />}
        {hotThree && renderHotThree(hotThree)}
      </div>

      {/* desktop */}
      <div className="hidden bg-main4 w-full-vw ml-half-vw gap-7.5 px-6% py-7.5 sm:px-8% sm:grid sm:grid-cols-2 md:px-13% lg:py-12.5 lg:grid lg:grid-cols-4">
        {hotThree && renderHotThree(hotThree)}
        {!userInfo ? <NotLogin /> : <Login user={userInfo} />}
      </div>
    </>
  )
}

export default HotThreeBox
