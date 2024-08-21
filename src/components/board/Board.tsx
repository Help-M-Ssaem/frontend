'use client'

import { BoardI } from '@/model/Board'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Profile from '../common/Profile'

export interface BoardProps {
  board: BoardI
}

const MAX_CONTENT_LENGTH = 60

const Board = ({ board }: BoardProps) => {
  const {
    id,
    title,
    content,
    imgUrl,
    likeCount,
    commentCount,
    createdAt,
    memberSimpleInfo,
  } = board

  const router = useRouter()

  const handleBoardClick = (boardId: number) => {
    router.push(`/board/${boardId}`)
  }

  const truncatedContent =
    content.length > MAX_CONTENT_LENGTH
      ? `${content.substring(0, MAX_CONTENT_LENGTH)}...`
      : content

  return (
    <div
      className="flex justify-between items-center cursor-pointer"
      onClick={() => handleBoardClick(id)}
    >
      <div className="flex flex-col justify-between gap-5">
        <Profile user={memberSimpleInfo} />
        <div className="flex flex-col gap-1">
          <p className="text-title3 font-bold text-maindark">{title}</p>
          <div
            className="text-body text-maindark"
            dangerouslySetInnerHTML={{ __html: truncatedContent }}
          />
        </div>
        <div className="flex items-center gap-7">
          <span className="text-caption text-gray2 whitespace-nowrap">
            {createdAt}
          </span>
          <p className="text-caption text-gray2 whitespace-nowrap">
            공감 {likeCount}
          </p>
          <p className="text-caption text-gray2 whitespace-nowrap">
            댓글 {commentCount}
          </p>
        </div>
      </div>

      <div>
        {imgUrl && <Image src={imgUrl} alt="board" width={150} height={150} />}
      </div>
    </div>
  )
}

export default Board
