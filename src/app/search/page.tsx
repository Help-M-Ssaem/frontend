'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  useKeywordSearch,
  useRealtimeKeywords,
  useRecentKeywords,
} from '@/service/search/useSearchService'
import { useState, useEffect } from 'react'
import Button from '@/components/common/Button'
import { useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/service/search/SearchQueries'

const SearchPage = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [keyword, setKeyword] = useState('')

  const { mutate: keywordSearch } = useKeywordSearch()

  const { data: recentKeywords } = useRecentKeywords()
  const { data: realtimeKeywords } = useRealtimeKeywords()

  useEffect(() => {
    const url = new URL(window.location.href)
    const searchKeyword = url.searchParams.get('keyword')
    if (searchKeyword) {
      setKeyword(searchKeyword)
    }
  }, [])

  const handleSearch = () => {
    if (keyword.trim() !== '') {
      keywordSearch(keyword, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: queryKeys.recentKeywords })
          queryClient.invalidateQueries({
            queryKey: queryKeys.realtimeKeywords,
          })
        },
      })
      router.push(`?keyword=${encodeURIComponent(keyword)}`)
    }
  }

  return (
    <div className="flex flex-col my-18 w-full max-w-160 mx-auto gap-8">
      <div className="flex items-center border-b border-maindark py-1 w-full">
        <input
          className="appearance-none bg-transparent border-none w-full text-maindark mr-3 py-1 focus:outline-none"
          type="text"
          placeholder="검색어를 입력해주세요."
          aria-label="Search"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch()
            }
          }}
        />
        <button
          className="flex-shrink-0 bg-transparent border-transparent"
          type="button"
          onClick={handleSearch}
        >
          <Image
            src="/images/search/search.svg"
            alt="search"
            width={35}
            height={35}
          />
        </button>
      </div>

      <div>
        <div className="text-title3 text-gray1 font-semibold mb-3">
          이전 검색어
        </div>
        <div className="flex flex-wrap gap-2">
          {Array.isArray(recentKeywords) ? (
            recentKeywords.map((item, idx: number) => (
              <Button
                key={idx}
                text={item.keyword}
                size="small"
                color="LIGHTPURPLE"
              />
            ))
          ) : (
            <div>이전 검색어가 없습니다.</div>
          )}
        </div>
      </div>

      <div>
        <div className="text-title3 text-gray1 font-semibold mb-3">
          인기 검색어
          <span className="text-caption font-regular text-gray3 ml-2">
            2023.07.14 18:06 기준
          </span>
        </div>
        <div className="flex flex-col gap-3">
          {Array.isArray(realtimeKeywords) ? (
            realtimeKeywords.map((item, idx: number) => (
              <div key={idx} className="flex items-center gap-4">
                <span className="text-headline text-maindark font-semibold">
                  {idx + 1}
                </span>
                {item.keyword}
              </div>
            ))
          ) : (
            <div>실시간 인기 검색어를 불러오지 못했습니다.</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchPage
