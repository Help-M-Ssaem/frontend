'use client'

import { useState, useEffect } from 'react'
import { CommentI } from '@/model/Comment'
import {
  useCommentList,
  useDiscussionCommentList,
} from '@/service/comment/useCommentService'
import { useToast } from '@/hooks/useToast'
import Comment from './Comment'
import CommentInput from './CommentInput'

export interface CommentListProps {
  id: number
  page: number
  size: number
  commentCount: number
  onCommentCountUpdate: (newCount: number) => void
  boardType?: string
}

const CommentList = ({
  id,
  page,
  size,
  commentCount,
  onCommentCountUpdate,
  boardType,
}: CommentListProps) => {
  const { data: generalCommentListData, refetch: refetchGeneralComments } =
    useCommentList({ id, page, size })

  const {
    data: discussionCommentListData,
    refetch: refetchDiscussionComments,
  } = useDiscussionCommentList({ id, page, size })

  const commentListData =
    boardType === 'discussion'
      ? discussionCommentListData
      : generalCommentListData

  const refetch =
    boardType === 'discussion'
      ? refetchDiscussionComments
      : refetchGeneralComments

  const [commentList, setCommentList] = useState<CommentI[]>([])

  useEffect(() => {
    if (commentListData) {
      setCommentList(commentListData.result)
    }
  }, [commentListData])

  const [replyId, setReplyId] = useState<number | undefined>(undefined)
  const [isReply, setIsReply] = useState(false)

  const { showToast } = useToast()

  // TODO: 공유, 신고 기능 추가
  const handleShareBtnClick = () => {
    showToast('공유 기능은 준비 중입니다')
  }
  const handleReportBtnClick = () => {
    showToast('신고 기능은 준비 중입니다')
  }

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
        <div className="flex gap-4 text-gray2 text-headline font-semibold">
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
        commentList.map(
          (comment: CommentI) =>
            !comment.parentId && (
              <div key={comment.commentId}>
                <Comment
                  comment={comment}
                  onClick={() => handleCommentClick(comment.commentId)}
                  refetchComments={refetch}
                  boardType={boardType}
                />
                <div className="h-[1px] bg-main my-4" />

                {/* 대댓글 */}
                {commentList.map(
                  (reply: CommentI) =>
                    reply.parentId === comment.commentId && (
                      <div key={reply.commentId}>
                        <Comment
                          comment={reply}
                          onClick={() => handleCommentClick(reply.parentId)}
                          refetchComments={refetch}
                          boardType={boardType}
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
                    boardType={boardType}
                  />
                )}
              </div>
            ),
        )}

      <div className="mb-4">
        <CommentInput
          refetchComments={refetch}
          onSuccess={handleReplySubmitSuccess}
          boardType={boardType}
        />
      </div>
    </div>
  )
}

CommentList.defaultProps = {
  boardType: 'board',
}

export default CommentList
