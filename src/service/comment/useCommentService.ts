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
    ...queryOptions.commentList(id),
    queryFn: () => queryOptions.commentList(id).queryFn({ page, size }),
  })

const useCommentListMember = (id: number, page: number, size: number) =>
  useQuery({
    ...queryOptions.commentListMember(id),
    queryFn: () => queryOptions.commentListMember(id).queryFn({ page, size }),
  })

const useCommentBest = ({ id, page, size }: CommentListProps) =>
  useQuery({
    ...queryOptions.commentBest(id),
    queryFn: () => queryOptions.commentBest(id).queryFn({ page, size }),
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
    ...queryOptions.discussionCommentList(id),
    queryFn: () =>
      queryOptions.discussionCommentList(id).queryFn({ page, size }),
  })

const useDiscussionCommentListMember = ({ id, page, size }: CommentListProps) =>
  useQuery({
    ...queryOptions.discussionCommentListMember(id),
    queryFn: () =>
      queryOptions.discussionCommentListMember(id).queryFn({ page, size }),
  })

const useDiscussionCommentBest = ({ id, page, size }: CommentListProps) =>
  useQuery({
    ...queryOptions.discussionCommentBest(id),
    queryFn: () =>
      queryOptions.discussionCommentBest(id).queryFn({ page, size }),
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
  useCommentListMember,
  useCommentBest,
  useCommentLike,
  usePostComment,
  useDeleteComment,
  useDiscussionCommentList,
  useDiscussionCommentListMember,
  useDiscussionCommentBest,
  useDiscussionCommentLike,
  usePostDiscussionComment,
  useDeleteDiscussionComment,
}
