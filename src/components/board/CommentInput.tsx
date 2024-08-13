'use client'

import { useState } from 'react'
import Image from 'next/image'
import { usePostComment } from '@/service/comment/useCommentService'
import { useParams } from 'next/navigation'
import Button from '../common/Button'

export interface CommentInputProps {
  replyId?: number
  refetchComments?: () => void
}

const CommentInput = ({ replyId, refetchComments }: CommentInputProps) => {
  const { id } = useParams()
  const [value, setValue] = useState('')

  const formData = new FormData()
  formData.append(
    'postBoardCommentReq',
    new Blob([JSON.stringify(value)], { type: 'application/json' }),
  )

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const { mutate: postComment } = usePostComment()
  const handleCommentSubmit = () => {
    if (replyId) {
      postComment(
        {
          id: Number(id),
          comment: formData,
          replyId,
        },
        {
          onSuccess: () => {
            setValue('')
            if (refetchComments) refetchComments()
          },
        },
      )
    } else {
      postComment(
        {
          id: Number(id),
          comment: formData,
        },
        {
          onSuccess: () => {
            setValue('')
            if (refetchComments) refetchComments()
          },
        },
      )
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
}

export default CommentInput
