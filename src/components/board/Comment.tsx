'use client'

import { CommentI } from '@/model/Comment'
import { useState } from 'react'
import { useCommentLike } from '@/service/comment/useCommentService'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import Profile from '../common/Profile'
import Button from '../common/Button'

export interface CommentProps {
  comment: CommentI
  onClick?: () => void
}

const Comment = ({ comment, onClick }: CommentProps) => {
  const { commentId, createdAt, isAllowed, memberSimpleInfo, content } = comment
  const { mutate: likeComment } = useCommentLike()
  const { id } = useParams()

  const [liked, setLiked] = useState(comment.isLiked)
  const [likeCount, setLikeCount] = useState(comment.likeCount)

  const handleToggleLike = () => {
    setLiked(!liked)
    setLikeCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1))
    likeComment({ id: Number(id), commentId })
  }

  const handleCommentUpdate = () => {}

  const handleCommentDelte = () => {}

  return (
    <div className="flex flex-col gap-5 ">
      <div className="flex justify-between items-start">
        <Profile user={memberSimpleInfo} createdAt={createdAt} />
        <div className="flex gap-1.25 items-center">
          <button
            onClick={handleToggleLike}
            type="button"
            className="flex items-center gap-1.5"
          >
            <Image
              src={`/images/board/${liked ? 'heart_fill' : 'heart_empty'}.svg`}
              alt={liked ? 'like' : 'unlike'}
              width={20}
              height={20}
            />
            <span className="text-gray2 text-title3 font-bold ">
              {likeCount}
            </span>
          </button>

          {isAllowed && (
            <div className="flex itmes-center text-title3 text-gray2 gap-2">
              <Button
                text="수정"
                onClick={handleCommentUpdate}
                size="small"
                color="PURPLE"
              />
              |
              <Button
                text="삭제"
                onClick={handleCommentDelte}
                size="small"
                color="PURPLE"
              />
            </div>
          )}
        </div>
      </div>
      <div
        className="text-maindark text-headline cursor-pointer"
        onClick={onClick}
      >
        {content}
      </div>
    </div>
  )
}

Comment.defaultProps = {
  onClick: undefined,
}

export default Comment
