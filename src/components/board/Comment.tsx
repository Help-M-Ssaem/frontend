'use client'

import { CommentI } from '@/model/Comment'
import { useState } from 'react'
import {
  useCommentLike,
  useDeleteComment,
} from '@/service/comment/useCommentService'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useToast } from '@/hooks/useToast'
import { useUserInfo } from '@/service/user/useUserService'
import Profile from '../common/Profile'

export interface CommentProps {
  comment: CommentI
  onClick?: () => void
  refetchComments?: () => void
}

const Comment = ({ comment, onClick, refetchComments }: CommentProps) => {
  const { id } = useParams()
  const boardId = Number(id)
  const {
    commentId,
    createdAt,
    isEditAllowed,
    memberSimpleInfo,
    content,
    parentId,
  } = comment
  const { mutate: likeComment } = useCommentLike()
  const { mutate: deleteComment } = useDeleteComment()

  const [liked, setLiked] = useState(comment.isLiked)
  const [likeCount, setLikeCount] = useState(comment.likeCount)
  const { data: userInfo } = useUserInfo()
  const { showToast } = useToast()

  const isDeleted = content === '삭제된 댓글입니다.'

  const handleToggleLike = () => {
    if (!userInfo) {
      showToast('로그인이 필요한 서비스입니다')
      return
    }
    if (userInfo && userInfo.id === memberSimpleInfo.id) {
      showToast('본인 댓글에는 좋아요를 누를 수 없습니다')
      return
    }
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
            refetchComments()
          }
        },
      },
    )
  }

  return (
    <div className="flex flex-col gap-5 ">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          {parentId !== 0 && (
            <Image
              src="/images/board/reply.svg"
              alt="reply"
              width={16}
              height={16}
            />
          )}
          <Profile user={memberSimpleInfo} createdAt={createdAt} />
        </div>
        {!isDeleted && (
          <div className="flex gap-4 items-center">
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
              className="flex items-center gap-1.5 cursor-pointer"
            >
              <Image
                src={`/images/board/${liked ? 'heart_fill' : 'heart_empty'}.svg`}
                alt={liked ? 'like' : 'unlike'}
                width={19}
                height={19}
              />
              <span className="text-gray2 text-title3 font-bold ">
                {likeCount}
              </span>
            </button>
          </div>
        )}
      </div>
      <div
        className={`text-maindark text-headline ${parentId !== 0 && 'ml-8'} ${!isDeleted ? 'cursor-pointer' : 'cursor-default'}`}
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
