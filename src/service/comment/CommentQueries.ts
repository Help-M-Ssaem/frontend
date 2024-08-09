import CommentService, {
  CommentDetailProps,
  CommentListProps,
  PostCommentProps,
} from './CommentService'

const queryKeys = {
  commentList: ['commentList'] as const,
  commentBest: ['commentBest'] as const,
  discussionCommentList: ['discussionCommentList'] as const,
  discussionCommentBest: ['discussionCommentBest'] as const,
}

const queryOptions = {
  // 게시판 댓글
  commentList: {
    queryKey: queryKeys.commentList,
    queryFn: async ({ id, page, size }: CommentListProps) => {
      const res = await CommentService.getCommentList({ id, page, size })
      return res.data
    },
  },

  commentBest: {
    queryKey: queryKeys.commentBest,
    queryFn: async ({ id, page, size }: CommentListProps) => {
      const res = await CommentService.getCommentBest({ id, page, size })
      return res.data
    },
  },

  postCommentLike: {
    queryKey: queryKeys.commentList,
    mutationFn: async ({
      id,
      commentId,
    }: CommentDetailProps): Promise<void> => {
      await CommentService.postCommentLike({ id, commentId })
    },
  },

  postComment: {
    queryKey: queryKeys.commentList,
    mutationFn: async ({
      id,
      comment,
      commentId,
    }: PostCommentProps): Promise<void> => {
      await CommentService.postComment({
        id,
        comment,
        commentId,
      })
    },
  },

  deleteComment: {
    queryKey: queryKeys.commentList,
    mutationFn: async ({
      id,
      commentId,
    }: CommentDetailProps): Promise<void> => {
      await CommentService.deleteComment({ id, commentId })
    },
  },

  // 토론 게시판 댓글
  discussionCommentList: {
    queryKey: queryKeys.discussionCommentList,
    queryFn: async ({ id, page, size }: CommentListProps) => {
      const res = await CommentService.getDiscussionCommentList({
        id,
        page,
        size,
      })
      return res.data
    },
  },

  discussionCommentBest: {
    queryKey: queryKeys.discussionCommentBest,
    queryFn: async ({ id, page, size }: CommentListProps) => {
      const res = await CommentService.getDiscussionCommentBest({
        id,
        page,
        size,
      })
      return res.data
    },
  },

  postDiscussionCommentLike: {
    queryKey: queryKeys.discussionCommentList,
    mutationFn: async ({
      id,
      commentId,
    }: CommentDetailProps): Promise<void> => {
      await CommentService.postDiscussionCommentLike({ id, commentId })
    },
  },

  postDiscussionComment: {
    queryKey: queryKeys.discussionCommentList,
    mutationFn: async ({
      id,
      comment,
      commentId,
    }: PostCommentProps): Promise<void> => {
      await CommentService.postDiscussionComment({
        id,
        comment,
        commentId,
      })
    },
  },

  deleteDiscussionComment: {
    queryKey: queryKeys.discussionCommentList,
    mutationFn: async ({
      id,
      commentId,
    }: CommentDetailProps): Promise<void> => {
      await CommentService.deleteDiscussionComment({ id, commentId })
    },
  },
}

export { queryKeys, queryOptions }
