'use client'

import { useRouter } from 'next/navigation'
import { useKeywordSearch } from '@/service/search/useSearchService'
import { useState, useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/service/search/SearchQueries'
import Board from '@/components/board/Board'
import { KeywordSearch } from '@/model/Search'
import WorryBoard from '@/components/worry/WorryBoard'
import DiscussionBoard from '@/components/discussion/DiscussionBoard'
import Container from '@/components/common/Container'
import { BoardI } from '@/model/Board'
import { WorryI } from '@/model/Worry'
import { DiscussionBoardI } from '@/model/Discussion'
import PopularKeywords from '@/components/search/RealtimeKeywords'
import RecentKeywords from '@/components/search/RecentKeywords'
import SearchBar from '@/components/search/SearchBar'

const SearchPage = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [keyword, setKeyword] = useState<string>('')
  const [result, setResult] = useState<KeywordSearch | null>(null)

  const { mutate: keywordSearch } = useKeywordSearch()

  useEffect(() => {
    const url = new URL(window.location.href)
    const searchKeyword = url.searchParams.get('keyword')
    if (searchKeyword) {
      setKeyword(searchKeyword)
    }
  }, [])

  const handleSearch = (searchKeyword?: string) => {
    const finalKeyword = searchKeyword || keyword
    if (finalKeyword.trim() !== '') {
      setKeyword(finalKeyword)
      keywordSearch(finalKeyword, {
        onSuccess: (keywordResult) => {
          queryClient.invalidateQueries({ queryKey: queryKeys.recentKeywords })
          queryClient.invalidateQueries({
            queryKey: queryKeys.realtimeKeywords,
          })
          setResult(keywordResult)
        },
      })
      router.push(`?keyword=${encodeURIComponent(finalKeyword)}`)
    }
  }

  return (
    <div className="flex flex-col my-18 w-full max-w-160 mx-auto gap-8">
      <SearchBar
        keyword={keyword}
        setKeyword={setKeyword}
        handleSearch={handleSearch}
      />

      <RecentKeywords handleSearch={handleSearch} />

      {result && (
        <>
          <div>
            <div className="text-title3 text-maindark font-semibold mb-3">
              전체 게시판
            </div>
            <Container color="purple">
              {result.boardSimpleInfos.result.length > 0 ? (
                result.boardSimpleInfos.result.map((board: BoardI) => (
                  <div key={board.id}>
                    <Board board={board} />
                    <div className="h-[1px] bg-main my-4 sm:my-6" />
                  </div>
                ))
              ) : (
                <div>게시판이 없습니다.</div>
              )}
            </Container>
          </div>

          <div>
            <div className="text-title3 text-maindark font-semibold mb-3">
              MBTI 과몰입 토론
            </div>
            <Container color="purple">
              {result.getWorriesRes.result.length > 0 ? (
                result.getWorriesRes.result.map((worry: WorryI) => (
                  <div key={worry.id}>
                    <WorryBoard worryBoard={worry} />
                    <div className="h-[1px] bg-main my-4 sm:my-6" />
                  </div>
                ))
              ) : (
                <div>MBTI 과몰입 토론이 없습니다.</div>
              )}
            </Container>
          </div>

          <div>
            <div className="text-title3 text-maindark font-semibold mb-3">
              M쌤 매칭을 기다리는 고민
            </div>
            <Container color="purple">
              {result.discussionSimpleInfo.result.length > 0 ? (
                result.discussionSimpleInfo.result.map(
                  (discussion: DiscussionBoardI) => (
                    <div key={discussion.id} className="flex flex-col">
                      <Container color="purple" className="cursor-pointer">
                        <DiscussionBoard discussionBoard={discussion} />
                      </Container>
                      <div className="h-[1px] bg-gray4 my-2.5 sm:my-12.5" />
                    </div>
                  ),
                )
              ) : (
                <div>M쌤 매칭을 기다리는 고민이 없습니다.</div>
              )}
            </Container>
          </div>
        </>
      )}

      <PopularKeywords />
    </div>
  )
}

export default SearchPage
