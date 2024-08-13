'use client'

import { CommentI } from '@/model/Comment'
import { useState } from 'react'
import {
  useCommentLike,
  useDeleteComment,
} from '@/service/comment/useCommentService'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import Profile from '../common/Profile'

export interface CommentProps {
  comment: CommentI
  onClick?: () => void
  refetchComments?: () => void // refetch 함수를 받아서 삭제 후 호출할 수 있도록 함
}

const Comment = ({ comment, onClick, refetchComments }: CommentProps) => {
  const { id } = useParams()
  const boardId = Number(id)
  const { commentId, createdAt, isEditAllowed, memberSimpleInfo, content } =
    comment
  const { mutate: likeComment } = useCommentLike()
  const { mutate: deleteComment } = useDeleteComment()

  const [liked, setLiked] = useState(comment.isLiked)
  const [likeCount, setLikeCount] = useState(comment.likeCount)

  const isDeleted = content === '삭제된 댓글입니다.'

  const handleToggleLike = () => {
    if (!isEditAllowed) {
      setLiked(!liked)
      setLikeCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1))
      likeComment({ id: boardId, commentId })
    }
  }

  const handleCommentDelete = () => {
    deleteComment(
      { id: boardId, commentId },
      {
        onSuccess: () => {
          if (refetchComments) {
            refetchComments() // 삭제 후 refetch 호출
          }
        },
      },
    )
  }

  return (
    <div className="flex flex-col gap-5 ">
      <div className="flex justify-between items-start">
        <Profile user={memberSimpleInfo} createdAt={createdAt} />
        {!isDeleted && (
          <div className="flex gap-2 items-center">
            {isEditAllowed && (
              <div className="flex items-center text-footnote text-gray2 gap-2">
                <div onClick={handleCommentDelete} className="cursor-pointer">
                  삭제
                </div>
              </div>
            )}
            <button
              onClick={handleToggleLike}
              type="button"
              className={`flex items-center gap-1.5 ${isEditAllowed ? 'cursor-default' : 'cursor-pointer'}`}
              disabled={isEditAllowed}
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
          </div>
        )}
      </div>
      <div
        className={`text-maindark text-headline ${!isDeleted ? 'cursor-pointer' : 'cursor-default'}`}
        onClick={isDeleted ? undefined : onClick}
      >
        {content}
      </div>
    </div>
  )
}

Comment.defaultProps = {
  onClick: undefined,
  refetchComments: undefined,
}

export default Comment
