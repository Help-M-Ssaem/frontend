'use client'

import Board from '@/components/board/Board'
import MbtiCategories from '@/components/board/MbtiCategories'
import Button from '@/components/common/Button'
import Container from '@/components/common/Container'
import { useBoardList } from '@/service/board/useBoardService'
import { useState } from 'react'

const BoardPage = () => {
  const [mbti, setMbti] = useState<string>('all')
  // const [page, setPage] = useState<number>(0)

  const { data } = useBoardList(mbti, 0, 6)

  return (
    <>
      <MbtiCategories selectedMbti={mbti} setMbti={setMbti} />
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
        {data &&
          data.result.map((board) => (
            <>
              <Board key={board.id} board={board} />
              <div className="h-[1px] bg-main" />
            </>
          ))}
      </Container>
    </>
  )
}

export default BoardPage
