'use client'

import { useState } from 'react'
import { useCommentList } from '@/service/comment/useCommentService'
import { CommentI } from '@/model/Comment'
import Comment from './Comment'
import CommentInput from './CommentInput'

interface CommentListProps {
  id: number
  page: number
  size: number
}

const CommentList = ({ id, page, size }: CommentListProps) => {
  const { data: commentList, refetch } = useCommentList({ id, page, size })
  const [replyId, setReplyId] = useState<number | undefined>(undefined)
  const [isReply, setIsReply] = useState(false)

  const handleShareBtnClick = () => {}

  const handleReportBtnClick = () => {}

  const handleCommentClick = (commentId: number) => {
    setReplyId(commentId)
    setIsReply(!isReply)
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
          <div key={comment.commentId}>
            <Comment
              comment={comment}
              onClick={() => handleCommentClick(comment.commentId)}
              refetchComments={refetch}
            />
            <div className="h-[1px] bg-main my-4" />
            {isReply && comment.commentId === replyId && (
              <CommentInput replyId={replyId} refetchComments={refetch} />
            )}
          </div>
        ))}

      <div className="mb-4">
        <CommentInput refetchComments={refetch} />
      </div>
    </div>
  )
}

export default CommentList
