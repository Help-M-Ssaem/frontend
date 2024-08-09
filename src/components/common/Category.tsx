'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

const categories = [
  { path: '/', label: 'HOME' },
  { path: '/board?mbti=all&page=1', label: '게시판' },
  { path: '/worry?waitingPage=1&solvedPage=1', label: 'M쌤 매칭' },
  { path: '/discussion?page=1', label: 'MBTI 과몰입 토론' },
]

const extraCategories = [
  { path: '/chatting', label: '채팅' },
  { path: '/alarm', label: '알람' },
  { path: '/favorites', label: '즐겨찾기' },
]

const Category = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [selected, setSelected] = useState<string | null>(null)

  useEffect(() => {
    if (pathname) {
      const fullPath = pathname + searchParams.toString()
      setSelected(fullPath)
    }
  }, [pathname, searchParams])

  const handleClick = (path: string) => {
    setSelected(path)
    router.push(path)
  }

  const getButtonClass = (categoryPath: string) => {
    if (categoryPath === '/') {
      return selected === '/'
        ? 'text-main1 font-bold after:content-[""] after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-[3px] after:bg-main1 after:opacity-100'
        : ''
    } else if (selected?.startsWith(categoryPath.split('?')[0])) {
      return 'text-main1 font-bold after:content-[""] after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-[3px] after:bg-main1 after:opacity-100'
    } else {
      return ''
    }
  }

  return (
    <div className="h-12 border-t border-t-gray5 whitespace-nowrap flex justify-between items-center overflow-x-scroll scrollbar-hide">
      <ul className="flex items-center text-title3 font-normal">
        {categories.map((category) => (
          <li key={category.path} className="list-none">
            <button
              type="button"
              onClick={() => handleClick(category.path)}
              className={`mr-7 cursor-pointer relative hover:text-main1 transition-all ${getButtonClass(category.path)}`}
            >
              {category.label}
            </button>
          </li>
        ))}
      </ul>

      <ul className="hidden sm:flex items-center justify-center whitespace-nowrap text-title3 font-normal list-none">
        {extraCategories.map((category) => (
          <li key={category.path} className="list-none">
            <button
              type="button"
              onClick={() => handleClick(category.path)}
              className={`ml-7 cursor-pointer relative hover:text-main1 transition-all ${getButtonClass(category.path)}`}
            >
              {category.label}
            </button>
          </li>
        ))}
        <li className="list-none">
          <button
            type="button"
            onClick={() => router.push('/search')}
            className="flex items-center ml-7 w-8 h-8 cursor-pointer relative hover:text-main1 transition-all"
          >
            <Image
              src="/images/common/search.svg"
              alt="search"
              width={35}
              height={35}
            />
          </button>
        </li>
      </ul>
    </div>
  )
}

export default Category
