import { HotThreeI } from '@/model/Home'
import { useRouter } from 'next/navigation'
import React from 'react'

export interface HotThreeProps {
  hotThree: HotThreeI
  board: string
}

const HotThree = ({ hotThree, board }: HotThreeProps) => {
  const {
    boardId,
    boardTitle,
    discussionId,
    discussionTitle,
    worryBoardId,
    worryBoardTitle,
  } = hotThree
  const router = useRouter()

  const getCurrentLabel = () => {
    if (board === 'board') return '게시물'
    if (board === 'discussion') return '토론글'
    if (board === 'worry') return '고민글'
    return '내용 없음'
  }

  const getTitle = () => {
    if (board === 'board') return boardTitle
    if (board === 'discussion') return discussionTitle
    if (board === 'worry') return worryBoardTitle
    return null
  }

  const currentLabel = getCurrentLabel()
  const title = getTitle()

  const handleGoToClick = () => {
    if (board === 'board') {
      router.push(`/board/${boardId}`)
    } else if (board === 'discussion') {
      router.push(`/discussion/${discussionId}`)
    } else if (board === 'worry') {
      router.push(`/worry/${worryBoardId}`)
    }
  }

  return (
    <div className="relative flex flex-col justify-between h-44 pt-10 pb-5 px-7.5 bg-white rounded-7.5 w-full min-w-67.5 sm:min-w-0">
      <div className="absolute top-[-14px] left-3.75 bg-alarm text-white text-footnote px-2.5 py-2 font-regular">
        HOT
      </div>
      <div>
        <div className="text-gray2 text-headline font-semibold mb-2">
          지금의 {currentLabel}
        </div>
        {title && (
          <div className="text-maindark text-title3 font-semibold break-words">
            {title}
          </div>
        )}
      </div>
      <div
        onClick={handleGoToClick}
        className="text-gray2 text-caption underline text-right cursor-pointer"
      >
        바로가기
      </div>
    </div>
  )
}

export default HotThree
