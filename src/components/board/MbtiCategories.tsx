'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import mbtiList from '@/constants/mbtiList'
import {
  useBoardListNumber,
  useCategoryBookmark,
  usePostCategoryBookmark,
} from '@/service/board/useBoardService'
import { useState, useEffect } from 'react'
import { useToast } from '@/hooks/useToast'

export interface MbtiCategoriesProps {
  selectedMbti: string
}

const MbtiCategories = ({ selectedMbti }: MbtiCategoriesProps) => {
  const router = useRouter()
  const { data: boardListNumber } = useBoardListNumber()
  const totalBoardCount = boardListNumber?.boardCount || 0

  const { data: categoryBookmark } = useCategoryBookmark()
  const { mutate: postCategoryBookmark } = usePostCategoryBookmark()
  const [favorites, setFavorites] = useState<Record<string, boolean>>({})

  const { showToast } = useToast()

  useEffect(() => {
    if (categoryBookmark) {
      const favoriteMbti = categoryBookmark.reduce(
        (acc: Record<string, boolean>, item: { mbti: string[] }) => {
          item.mbti.forEach((mbti) => {
            acc[mbti] = true
          })
          return acc
        },
        {},
      )
      setFavorites(favoriteMbti)
    }
  }, [categoryBookmark])

  const handleMbtiChange = (mbti: string) => {
    router.push(`/board?mbti=${mbti}&page=1`)
  }

  const toggleFavorite = (mbti: string) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [mbti]: !prevFavorites[mbti],
    }))
    postCategoryBookmark(mbti, {
      onSuccess: () => {
        if (favorites[mbti]) {
          showToast('즐겨찾기에서 제거하였습니다.')
          return
        }
        showToast('즐겨찾기에 추가하였습니다.')
      },
    })
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
            className={`col-span-1 flex items-start justify-center cursor-pointer text-maindark ${selectedMbti === 'all' ? 'underline' : ''}`}
            onClick={() => handleMbtiChange('all')}
          >
            전체 ({totalBoardCount})
          </div>
          <div className="col-span-4 grid grid-cols-4 gap-4">
            {mbtiList.map((mbti, index) => {
              const mbtiCount =
                (boardListNumber as any)?.[mbti.toLowerCase()] || 0
              const isFavorite = favorites[mbti] || false
              return (
                <div
                  key={index}
                  className="flex gap-3 items-center cursor-pointer min-w-[150px]"
                  onClick={() => handleMbtiChange(mbti)}
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
