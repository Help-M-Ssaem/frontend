import {
  useMutation,
  useQuery,
  UseMutationOptions,
} from '@tanstack/react-query'
import { queryOptions } from './DiscussionQueries'
import { DiscussionParticipationProps } from './DiscussionService'

const useDiscussionList = (page: number, size: number) =>
  useQuery({
    ...queryOptions.discussionList,
    queryKey: ['discussionList', page, size],
    queryFn: () => queryOptions.discussionList.queryFn({ page, size }),
  })

const useDiscussionListMember = (id: number, page: number, size: number) =>
  useQuery({
    ...queryOptions.discussionListMember,
    queryKey: ['discussionListMember', id, page, size],
    queryFn: () =>
      queryOptions.discussionListMember.queryFn({ id, page, size }),
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

const usePostDiscussionOptionFiles = () => {
  const mutationFn = (blob: Blob): Promise<string> =>
    queryOptions.postDiscussionOptionFiles.mutationFn(blob)

  const options: UseMutationOptions<string, Error, Blob, unknown> = {
    mutationFn,
  }
  return useMutation<string, Error, Blob>(options)
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
  }: DiscussionParticipationProps): Promise<void> =>
    queryOptions.postDiscussionPraticipation.mutationFn({
      discussionId,
      discussionOptionId,
    })

  const options: UseMutationOptions<
    void,
    Error,
    DiscussionParticipationProps,
    unknown
  > = {
    mutationFn,
  }
  return useMutation<void, Error, DiscussionParticipationProps>(options)
}

export {
  useDiscussionList,
  useDiscussionListMember,
  useDiscussionDetail,
  usePostDiscussion,
  usePostDiscussionOptionFiles,
  useDeleteDiscussion,
  usePostDiscussionPraticipation,
}
