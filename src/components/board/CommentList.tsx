'use client'

import { useState } from 'react'
import {
  useCommentList,
  useDiscussionCommentList,
} from '@/service/comment/useCommentService'
import { CommentI } from '@/model/Comment'
import Comment from './Comment'
import ChattingInput from '../chatting/ChattingInput'

interface CommentListProps {
  id: number
  page: number
  size: number
  board: string
}

const CommentList = ({ id, page, size, board }: CommentListProps) => {
  const [newComment, setNewComment] = useState<FormData>(new FormData())
  const commentListResult = useCommentList({ id, page, size })
  const discussionCommentListResult = useDiscussionCommentList({
    id,
    page,
    size,
  })

  const commentList =
    board === 'board'
      ? commentListResult.data
      : discussionCommentListResult.data

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData()
    formData.append('comment', e.target.value)
    setNewComment(formData)
  }

  const handleShareBtnClick = () => {
    console.log('share')
  }
  const handleReportBtnClick = () => {
    console.log('report')
  }
  const handleCommentSubmit = () => {
    console.log('submit')
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <div className="text-maindark text-title3 font-semibold">
          전체 댓글 {commentList && commentList.totalSize}개
        </div>
        <div className="flex gap-4 text-gray2 text-title3 font-semibold">
          <button
            type="button"
            className="cursor-pointer"
            onClick={handleShareBtnClick}
          >
            공유
          </button>
          <button
            type="button"
            className="cursor-pointer"
            onClick={handleReportBtnClick}
          >
            신고
          </button>
        </div>
      </div>
      <div className="h-[1px] bg-main my-4" />
      {commentList &&
        commentList.result.map((comment: CommentI) => (
          <>
            <Comment key={comment.commentId} comment={comment} />
            <div className="h-[1px] bg-main my-4" />
          </>
        ))}

      <div className="mb-4">
        <ChattingInput
          value={newComment.get('comment')?.toString() || ''}
          onChange={handleCommentChange}
          onClick={handleCommentSubmit}
        />
      </div>
    </div>
  )
}

export default CommentList
