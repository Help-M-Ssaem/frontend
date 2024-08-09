import {
  useMutation,
  useQuery,
  UseMutationOptions,
} from '@tanstack/react-query'
import { queryOptions } from './DiscussionQueries'
import { DicussionParticipationProps } from './DiscussionService'

const useDiscussionList = (page: number, size: number) =>
  useQuery({
    ...queryOptions.discussionList,
    queryKey: ['discussionList', page, size],
    queryFn: () => queryOptions.discussionList.queryFn({ page, size }),
  })

const useDiscussionDetail = (id: number) =>
  useQuery({
    ...queryOptions.discussionDetail,
    queryKey: ['discussionDetail', id],
    queryFn: () => queryOptions.discussionDetail.queryFn(id),
  })

const usePostDiscussion = () => {
  const mutationFn = (discussion: FormData): Promise<void> =>
    queryOptions.postDiscussion.mutationFn(discussion)

  const options: UseMutationOptions<void, Error, FormData, unknown> = {
    mutationFn,
  }
  return useMutation<void, Error, FormData>(options)
}

const useDeleteDiscussion = () => {
  const mutationFn = (id: number): Promise<void> =>
    queryOptions.deleteDiscussion.mutationFn(id)

  const options: UseMutationOptions<void, Error, number, unknown> = {
    mutationFn,
  }
  return useMutation<void, Error, number>(options)
}

const usePostDiscussionPraticipation = () => {
  const mutationFn = ({
    discussionId,
    discussionOptionId,
  }: DicussionParticipationProps): Promise<void> =>
    queryOptions.postDiscussionPraticipation.mutationFn({
      discussionId,
      discussionOptionId,
    })

  const options: UseMutationOptions<
    void,
    Error,
    DicussionParticipationProps,
    unknown
  > = {
    mutationFn,
  }
  return useMutation<void, Error, DicussionParticipationProps>(options)
}

export {
  useDiscussionList,
  useDiscussionDetail,
  usePostDiscussion,
  useDeleteDiscussion,
  usePostDiscussionPraticipation,
}
