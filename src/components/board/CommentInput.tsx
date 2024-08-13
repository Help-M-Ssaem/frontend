'use client'

import { useState } from 'react'
import { usePostComment } from '@/service/comment/useCommentService'
import { useParams } from 'next/navigation'
import Button from '../common/Button'

export interface CommentInputProps {
  replyId?: number
}

const CommentInput = ({ replyId }: CommentInputProps) => {
  const { id } = useParams()
  const [value, setValue] = useState('')

  const formData = new FormData()
  formData.append(
    'postBoardCommentReq',
    new Blob([JSON.stringify(value)], { type: 'application/json' }),
  )

  const handleCommentChagne = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const { mutate: postComment } = usePostComment()
  const handleCommentSubmit = () => {
    if (replyId) {
      postComment({
        id: Number(id),
        comment: formData,
        replyId,
      })
    } else {
      postComment({
        id: Number(id),
        comment: formData,
      })
    }
    setValue('')
  }

  return (
    <div className="flex w-full gap-3.75">
      <input
        type="text"
        className="w-full text-gray2 text-headline font-semibold px-4 py-3 border border-main rounded-7.5 focus:outline-none focus:border-main"
        value={value}
        onChange={handleCommentChagne}
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
  replyId: false,
}

export default CommentInput
