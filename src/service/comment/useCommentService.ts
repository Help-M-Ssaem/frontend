import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from '@tanstack/react-query'
import { queryOptions } from './CommentQueries'
import {
  CommentDetailProps,
  CommentListProps,
  PostCommentProps,
} from './CommentService'

// 게시판 댓글
const useCommentList = ({ id, page, size }: CommentListProps) =>
  useQuery({
    ...queryOptions.commentList,
    queryKey: ['commentList'],
    queryFn: () => queryOptions.commentList.queryFn({ id, page, size }),
  })

const useCommentBest = ({ id, page, size }: CommentListProps) =>
  useQuery({
    ...queryOptions.commentBest,
    queryKey: ['commentBest'],
    queryFn: () => queryOptions.commentBest.queryFn({ id, page, size }),
  })

const useCommentLike = () => {
  const mutationFn = ({ id, commentId }: CommentDetailProps): Promise<void> =>
    queryOptions.postCommentLike.mutationFn({ id, commentId })

  const options: UseMutationOptions<void, Error, CommentDetailProps, unknown> =
    {
      mutationFn,
    }
  return useMutation<void, Error, CommentDetailProps>(options)
}

const usePostComment = () => {
  const mutationFn = ({
    id,
    comment,
    commentId,
  }: PostCommentProps): Promise<void> =>
    queryOptions.postComment.mutationFn({ id, comment, commentId })

  const options: UseMutationOptions<void, Error, PostCommentProps, unknown> = {
    mutationFn,
  }
  return useMutation<void, Error, PostCommentProps>(options)
}

const useDeleteComment = () => {
  const mutationFn = ({ id, commentId }: CommentDetailProps): Promise<void> =>
    queryOptions.deleteComment.mutationFn({ id, commentId })

  const options: UseMutationOptions<void, Error, CommentDetailProps, unknown> =
    {
      mutationFn,
    }
  return useMutation<void, Error, CommentDetailProps>(options)
}

// 토론 게시판 댓글
const useDiscussionCommentList = ({ id, page, size }: CommentListProps) =>
  useQuery({
    ...queryOptions.discussionCommentList,
    queryKey: ['discussionCommentList'],
    queryFn: () =>
      queryOptions.discussionCommentList.queryFn({ id, page, size }),
  })

const useDiscussionCommentBest = ({ id, page, size }: CommentListProps) =>
  useQuery({
    ...queryOptions.discussionCommentBest,
    queryKey: ['discussionCommentBest'],
    queryFn: () =>
      queryOptions.discussionCommentBest.queryFn({ id, page, size }),
  })

const useDiscussionCommentLike = () => {
  const mutationFn = ({ id, commentId }: CommentDetailProps): Promise<void> =>
    queryOptions.postDiscussionCommentLike.mutationFn({ id, commentId })

  const options: UseMutationOptions<void, Error, CommentDetailProps, unknown> =
    {
      mutationFn,
    }
  return useMutation<void, Error, CommentDetailProps>(options)
}

const usePostDiscussionComment = () => {
  const mutationFn = ({
    id,
    comment,
    commentId,
  }: PostCommentProps): Promise<void> =>
    queryOptions.postDiscussionComment.mutationFn({ id, comment, commentId })

  const options: UseMutationOptions<void, Error, PostCommentProps, unknown> = {
    mutationFn,
  }
  return useMutation<void, Error, PostCommentProps>(options)
}

const useDeleteDiscussionComment = () => {
  const mutationFn = ({ id, commentId }: CommentDetailProps): Promise<void> =>
    queryOptions.deleteComment.mutationFn({ id, commentId })

  const options: UseMutationOptions<void, Error, CommentDetailProps, unknown> =
    {
      mutationFn,
    }
  return useMutation<void, Error, CommentDetailProps>(options)
}

export {
  useCommentList,
  useCommentBest,
  useCommentLike,
  usePostComment,
  useDeleteComment,
  useDiscussionCommentList,
  useDiscussionCommentBest,
  useDiscussionCommentLike,
  usePostDiscussionComment,
  useDeleteDiscussionComment,
}
