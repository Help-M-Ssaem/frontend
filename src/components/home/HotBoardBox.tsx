'use client'

import { useHotBoard } from '@/service/home/useHomeService'
import HotBoard from './HotBoard'

const HotBoardBox = () => {
  const { data: hotBoard } = useHotBoard()

  return (
    <>
      <div className="text-title3 text-maindark font-bold my-5">HOT 게시글</div>
      <div className="flex flex-wrap justify-center gap-7.5 md:grid md:grid-cols-1 lg:grid lg:grid-cols-2">
        {hotBoard && (
          <>
            {hotBoard.map((board) => (
              <HotBoard hotBoard={board} key={board.title} />
            ))}
          </>
        )}
      </div>
    </>
  )
}

export default HotBoardBox
