'use client'

import dynamic from 'next/dynamic'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useToast } from '@/hooks/useToast'
import { useUserInfo } from '@/service/user/useUserService'
import { useRouter, usePathname } from 'next/navigation'
import Button from './Button'

const Category = dynamic(() => import('./Category'), { ssr: false })

const extraCategories = [
  { path: '/chatting', label: '채팅' },
  { path: '/alarm', label: '알람' },
  { path: '/favorites', label: '즐겨찾기' },
]

const Header = () => {
  const pathname = usePathname()
  const router = useRouter()
  const [selected, setSelected] = useState<string | null>(null)
  const { data: userInfo } = useUserInfo()

  const { showToast } = useToast()

  useEffect(() => {
    if (pathname) {
      setSelected(pathname)
    }
  }, [pathname])

  const handleCategoryClick = (path: string) => {
    if (!userInfo) {
      showToast('로그인이 필요한 서비스입니다')
      return
    }
    setSelected(path)
    router.push(path)
  }

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-white z-50 shadow-custom-light px-5 sm:px-7% md:px-10%">
        {/* desktop */}
        <div
          role="button"
          tabIndex={0}
          className="hidden cursor-auto sm:flex justify-between items-center py-5"
        >
          <Image
            src="/images/common/logo.svg"
            alt="logo"
            width={238}
            height={78}
            onClick={() => router.push('/')}
            className="cursor-pointer"
          />
          {!userInfo && (
            <Button
              text="로그인하고 이용하기"
              color="PURPLE"
              size="medium"
              onClick={() => router.push('/signin')}
            />
          )}
        </div>

        {/* mobile */}
        <div className="sm:hidden flex justify-between items-center pt-4 pb-2">
          <Image
            src="/images/common/cat_logo.svg"
            alt="cat logo"
            width={35}
            height={30}
            onClick={() => router.push('/')}
            className="cursor-pointer"
          />
          <div className="flex items-center gap-5 list-none">
            {extraCategories.map((category) => (
              <li key={category.path}>
                <button
                  type="button"
                  onClick={() => handleCategoryClick(category.path)}
                  className={`cursor-pointer relative hover:text-main1 transition-all text-maindark ${
                    selected === category.path
                      ? 'text-main1 font-bold after:content-[""] after:absolute after:bottom-[-10px] after:left-0 after:w-full after:h-[2px] after:bg-main1 after:opacity-100'
                      : ''
                  }`}
                >
                  {category.label}
                </button>
              </li>
            ))}
            <Image
              src="/images/common/search.svg"
              alt="search"
              width={35}
              height={35}
              onClick={() => router.push('/search')}
            />
          </div>
        </div>
        <Category />
      </header>
      <div className="pt-24 sm:pt-38.5">
        {/* 다른 콘텐츠는 이 div 내부에 위치 */}
      </div>
    </>
  )
}

export default Header
