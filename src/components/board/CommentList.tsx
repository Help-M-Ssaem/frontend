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
  commentCount: number
  onCommentCountUpdate: (newCount: number) => void
}

const CommentList = ({
  id,
  page,
  size,
  commentCount,
  onCommentCountUpdate,
}: CommentListProps) => {
  const { data: commentList, refetch } = useCommentList({ id, page, size })
  const [replyId, setReplyId] = useState<number | undefined>(undefined)
  const [isReply, setIsReply] = useState(false)

  const handleShareBtnClick = () => {}

  const handleReportBtnClick = () => {}

  const handleCommentClick = (commentId: number) => {
    setReplyId(commentId)
    setIsReply(!isReply)
  }

  const handleReplySubmitSuccess = () => {
    setIsReply(false)
    setReplyId(undefined)
    onCommentCountUpdate(commentCount + 1)
    refetch()
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <div className="text-maindark text-title3 font-semibold">
          전체 댓글 {commentCount}개
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
        commentList.result.map(
          (comment: CommentI) =>
            !comment.parentId && (
              <div key={comment.commentId}>
                <Comment
                  comment={comment}
                  onClick={() => handleCommentClick(comment.commentId)}
                  refetchComments={refetch}
                />
                <div className="h-[1px] bg-main my-4" />

                {/* 대댓글 */}
                {commentList.result.map(
                  (reply: CommentI) =>
                    reply.parentId === comment.commentId && (
                      <div key={reply.commentId}>
                        <Comment
                          comment={reply}
                          onClick={() => handleCommentClick(reply.parentId)}
                          refetchComments={refetch}
                        />
                        <div className="h-[1px] bg-main my-4" />
                      </div>
                    ),
                )}
                {isReply && comment.commentId === replyId && (
                  <CommentInput
                    replyId={replyId}
                    refetchComments={refetch}
                    onSuccess={handleReplySubmitSuccess}
                  />
                )}
              </div>
            ),
        )}

      <div className="mb-4">
        <CommentInput
          refetchComments={refetch}
          onSuccess={handleReplySubmitSuccess}
        />
      </div>
    </div>
  )
}

export default CommentList
