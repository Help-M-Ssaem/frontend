'use client'

import { CommentI } from '@/model/Comment'
import { useState } from 'react'
import Image from 'next/image'
import Profile from '../common/Profile'

export interface CommentProps {
  comment: CommentI
}

const Comment = ({ comment }: CommentProps) => {
  const {
    memberSimpleInfo,
    createdAt,
    content,
    likeCount,
    isAllowed,
    isLiked,
  } = comment

  const [liked, setLiked] = useState(isLiked)
  const toggleLike: () => void = () => {
    setLiked(!liked)
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-start">
        <Profile user={memberSimpleInfo} createdAt={createdAt} />
        <div className="flex gap-1.25 items-center">
          <button onClick={toggleLike} type="button">
            {isLiked ? (
              <Image
                src="/images/board/heart_fill.svg"
                alt="like"
                width={20}
                height={20}
              />
            ) : (
              <Image
                src="/images/board/heart_empty.svg"
                alt="unlike"
                width={20}
                height={20}
              />
            )}
          </button>
          <span className="text-gray2 text-title3 font-bold ">
            {likeCount}
            {isAllowed}
          </span>
        </div>
      </div>
      <div className="text-maindark text-headline">{content}</div>
    </div>
  )
}

export default Comment
