'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  usePostComment,
  usePostDiscussionComment,
} from '@/service/comment/useCommentService'
import { useParams } from 'next/navigation'
import Button from '../common/Button'

export interface CommentInputProps {
  replyId?: number
  refetchComments?: () => void
  onSuccess?: () => void
  boardType?: string
}

const CommentInput = ({
  replyId,
  refetchComments,
  onSuccess,
  boardType,
}: CommentInputProps) => {
  const { id } = useParams()
  const [value, setValue] = useState('')

  const formData = new FormData()
  formData.append(
    boardType === 'discussion'
      ? 'postDiscussionCommentReq'
      : 'postBoardCommentReq',
    new Blob([JSON.stringify(value)], { type: 'application/json' }),
  )

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const { mutate: postComment } = usePostComment()
  const { mutate: postDiscussionComment } = usePostDiscussionComment()

  const handleCommentSubmit = () => {
    const postCommentOptions = {
      id: Number(id),
      comment: formData,
      replyId,
    }

    if (boardType === 'discussion') {
      postDiscussionComment(postCommentOptions, {
        onSuccess: () => {
          setValue('')
          if (refetchComments) refetchComments()
          if (onSuccess) onSuccess()
        },
      })
    } else {
      postComment(postCommentOptions, {
        onSuccess: () => {
          setValue('')
          if (refetchComments) refetchComments()
          if (onSuccess) onSuccess()
        },
      })
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommentSubmit()
    }
  }

  return (
    <div className="flex w-full gap-3.75 mb-7.5">
      {replyId && (
        <Image
          src="/images/board/reply.svg"
          alt="reply"
          width={20}
          height={20}
        />
      )}
      <input
        type="text"
        className="w-full text-gray2 text-headline font-semibold px-4 py-3 border border-main rounded-7.5 focus:outline-none focus:border-main"
        value={value}
        onChange={handleCommentChange}
        onKeyDown={handleKeyPress}
      />
      <Button
        text="등록"
        color="PURPLE"
        size="small"
        onClick={handleCommentSubmit}
      />
    </div>
  )
}

CommentInput.defaultProps = {
  replyId: undefined,
  refetchComments: undefined,
  onSuccess: undefined,
  boardType: 'board',
}

export default CommentInput
