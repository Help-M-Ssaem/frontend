import CommentService, {
  CommentDetailProps,
  CommentListProps,
  PostCommentProps,
} from './CommentService'

const queryKeys = {
  commentList: (id: number) => ['commentList', id] as const,
  commentBest: (id: number) => ['commentBest', id] as const,
  discussionCommentList: (id: number) => ['discussionCommentList', id] as const,
  discussionCommentBest: (id: number) => ['discussionCommentBest', id] as const,
}

const queryOptions = {
  // 게시판 댓글
  commentList: (id: number) => ({
    queryKey: queryKeys.commentList(id),
    queryFn: async ({ page, size }: Omit<CommentListProps, 'id'>) => {
      const res = await CommentService.getCommentList({ id, page, size })
      return res.data
    },
  }),

  commentListMember: (id: number) => ({
    queryKey: queryKeys.commentList(id),
    queryFn: async ({ page, size }: Omit<CommentListProps, 'id'>) => {
      const res = await CommentService.getCommentListMember({ id, page, size })
      return res.data
    },
  }),

  commentBest: (id: number) => ({
    queryKey: queryKeys.commentBest(id),
    queryFn: async ({ page, size }: Omit<CommentListProps, 'id'>) => {
      const res = await CommentService.getCommentBest({ id, page, size })
      return res.data
    },
  }),

  postCommentLike: {
    mutationFn: async ({
      id,
      commentId,
    }: CommentDetailProps): Promise<void> => {
      await CommentService.postCommentLike({ id, commentId })
    },
  },

  postComment: {
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
    mutationFn: async ({
      id,
      commentId,
    }: CommentDetailProps): Promise<void> => {
      await CommentService.deleteComment({ id, commentId })
    },
  },

  // 토론 게시판 댓글
  discussionCommentList: (id: number) => ({
    queryKey: queryKeys.discussionCommentList(id),
    queryFn: async ({ page, size }: Omit<CommentListProps, 'id'>) => {
      const res = await CommentService.getDiscussionCommentList({
        id,
        page,
        size,
      })
      return res.data
    },
  }),

  discussionCommentListMember: (id: number) => ({
    queryKey: queryKeys.discussionCommentList(id),
    queryFn: async ({ page, size }: Omit<CommentListProps, 'id'>) => {
      const res = await CommentService.getDiscussionCommentListMember({
        id,
        page,
        size,
      })
      return res.data
    },
  }),

  discussionCommentBest: (id: number) => ({
    queryKey: queryKeys.discussionCommentBest(id),
    queryFn: async ({ page, size }: Omit<CommentListProps, 'id'>) => {
      const res = await CommentService.getDiscussionCommentBest({
        id,
        page,
        size,
      })
      return res.data
    },
  }),

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
