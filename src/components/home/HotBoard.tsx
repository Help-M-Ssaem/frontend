'use client'

import Image from 'next/image'
import Profile, { ProfileProps } from '../common/Profile'
import Container from '../common/Container'

export interface HotBoardProps {
  title: string
  content: string
  imgUrl: string
  boardMbti: string
  likeCount: number
  commentCount: number
  createdAt: string
  memberSimpleInfo: ProfileProps
}

const HotBoard = ({
  title,
  content,
  imgUrl,
  boardMbti,
  likeCount,
  commentCount,
  createdAt,
  memberSimpleInfo,
}: HotBoardProps) => (
  <Container color="purple">
    <div className="flex justify-between">
      <div className="flex flex-col justify-between gap-5">
        <Profile {...memberSimpleInfo} />
        <div className="flex flex-col gap-1">
          <p className="text-title3 font-bold">{title}</p>
          <p className="text-body text-mainblack">{content}</p>
        </div>
        <p className="text-caption text-gray2">{boardMbti}</p>
      </div>

      <div className="flex flex-col justify-center items-end gap-2.5">
        <span className="text-caption text-gray2">{createdAt}</span>
        {imgUrl && <Image src={imgUrl} alt="board" width={95} height={95} />}
        <div className="flex justify-end gap-2">
          <p className="text-caption text-gray2">공감 {likeCount}</p>
          <p className="text-caption text-gray2">댓글 {commentCount}</p>
        </div>
      </div>
    </div>
  </Container>
)

export default HotBoard
