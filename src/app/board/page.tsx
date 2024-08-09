'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import Board from '@/components/board/Board'
import MbtiCategories from '@/components/board/MbtiCategories'
import Button from '@/components/common/Button'
import Container from '@/components/common/Container'
import Pagination from '@/components/common/Pagination'
import SearchBar from '@/components/common/SearchBar'
import { useBoardList } from '@/service/board/useBoardService'
import { useEffect, useState } from 'react'

const BoardPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const mbtiQuery = searchParams.get('mbti') || 'all'
  const pageQuery = searchParams.get('page') || '1'

  const [mbti, setMbti] = useState<string>(mbtiQuery)
  const [page, setPage] = useState<number>(Number(pageQuery))
  const pageSize = 6

  const { data: boardList } = useBoardList(mbti, page - 1, pageSize)

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    router.push(`/board?mbti=${mbti}&page=${newPage}`)
  }

  useEffect(() => {
    if (mbti !== mbtiQuery) {
      setMbti(mbtiQuery)
      setPage(1)
      router.push(`/board?mbti=${mbtiQuery}&page=1`)
    }
  }, [mbtiQuery])

  return (
    <>
      <MbtiCategories selectedMbti={mbti} />
      <div className="text-title3 text-maindark font-semibold my-5">
        {mbti === 'all' ? '전체' : mbti} 게시판
      </div>
      <Container color="purple">
        <div className="text-right mb-5">
          <Button
            text="글 쓰기"
            color="PURPLE"
            size="small"
            onClick={() => {}}
          />
        </div>
        <div className="h-[1px] bg-main" />
        {boardList &&
          boardList.result.map((board) => (
            <div key={board.id}>
              <Board board={board} />
              <div className="h-[1px] bg-main" />
            </div>
          ))}

        {boardList && (
          <div className="mt-5">
            <Pagination
              pagesCount={boardList.totalSize}
              currentPage={page}
              onPageChange={handlePageChange}
            />
          </div>
        )}
        <div className="my-7.5">
          <SearchBar onSearch={() => {}} />
        </div>
      </Container>
    </>
  )
}

export default BoardPage
