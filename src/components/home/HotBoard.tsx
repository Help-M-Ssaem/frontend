'use client'

import { HotBoardI } from '@/model/Home'
import Image from 'next/image'
import Profile from '../common/Profile'
import Container from '../common/Container'

export interface HotBoardProps {
  hotBoard: HotBoardI
}

const MAX_CONTENT_LENGTH = 50

const HotBoard = ({ hotBoard }: HotBoardProps) => {
  const {
    title,
    content,
    imgUrl,
    boardMbti,
    likeCount,
    commentCount,
    createdAt,
    memberSimpleInfo,
  } = hotBoard

  const truncatedContent =
    content.length > MAX_CONTENT_LENGTH
      ? `${content.substring(0, MAX_CONTENT_LENGTH)}...`
      : content

  return (
    <Container color="purple">
      <div className="flex justify-between">
        <div className="flex flex-col justify-between gap-5">
          <Profile user={memberSimpleInfo} />
          <div className="flex flex-col gap-1">
            <p className="text-title3 font-bold text-maindark">{title}</p>
            <p
              className="text-body text-maindark"
              dangerouslySetInnerHTML={{ __html: truncatedContent }}
            />
          </div>
          <p className="text-caption text-gray2">{boardMbti}</p>
        </div>

        <div className="flex flex-col justify-between items-end gap-2.5">
          <span className="text-caption text-gray2">{createdAt}</span>
          <div className="w-[95px] h-[95px]">
            {imgUrl && (
              <Image
                src={imgUrl}
                alt="board"
                width={95}
                height={95}
                className="object-cover"
              />
            )}
          </div>
          <div className="flex justify-end gap-2">
            <p className="text-caption text-gray2">공감 {likeCount}</p>
            <p className="text-caption text-gray2">댓글 {commentCount}</p>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default HotBoard
