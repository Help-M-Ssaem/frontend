'use client'

import Image from 'next/image'
import mbtiList from '@/constants/mbtiList'
import {
  useBoardListNumber,
  usePostCategoryBookmark,
} from '@/service/board/useBoardService'
import { useState } from 'react'

export interface MbtiCategoriesProps {
  selectedMbti: string
  setMbti: (mbti: string) => void
}

const MbtiCategories = ({ selectedMbti, setMbti }: MbtiCategoriesProps) => {
  const { data } = useBoardListNumber()
  const totalBoardCount = data?.boardCount || 0

  const { mutate } = usePostCategoryBookmark()
  const [favorites, setFavorites] = useState<Record<string, boolean>>({})

  const toggleFavorite = (mbti: string) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [mbti]: !prevFavorites[mbti],
    }))

    mutate(mbti)
  }

  return (
    <div className="w-full-vw ml-half-vw px-4% sm:px-8% md:px-13% bg-main3">
      <div className="text-title3 font-semibold text-main2 text-center py-6">
        MBTI 별 게시판
      </div>
      <div className="h-[1px] bg-main" />
      <div className="overflow-x-auto scrollbar-hide py-9">
        <div className="min-w-max grid grid-cols-5 gap-4">
          <div
            className={`col-span-1 flex items-start justify-center cursor-pointer ${selectedMbti === 'all' ? 'underline' : ''}`}
            onClick={() => setMbti('all')}
          >
            전체 ({totalBoardCount})
          </div>
          <div className="col-span-4 grid grid-cols-4 gap-4">
            {mbtiList.map((mbti, index) => {
              const mbtiCount = (data as any)?.[mbti.toLowerCase()] || 0
              const isFavorite = favorites[mbti] || false
              return (
                <div
                  key={index}
                  className="flex gap-3 items-center cursor-pointer min-w-[150px]"
                  onClick={() => setMbti(mbti)}
                >
                  <p
                    className={`whitespace-nowrap text-gray2 min-w-20 ${selectedMbti === mbti ? 'underline' : ''}`}
                  >
                    {mbti} ({mbtiCount})
                  </p>
                  <div
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(mbti)
                    }}
                  >
                    <Image
                      src={`/images/board/${isFavorite ? 'star_fill' : 'star_empty'}.svg`}
                      alt="star"
                      width={16}
                      height={16}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MbtiCategories
