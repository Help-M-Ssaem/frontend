import DiscussionService, {
  DicussionParticipationProps,
  DiscussionListProps,
} from './DiscussionService'

const queryKeys = {
  discussion: (discussionId: number) => ['discussion', discussionId] as const,
  discussionList: ['discussionList'] as const,
}

const queryOptions = {
  discussionList: {
    queryKey: queryKeys.discussionList,
    queryFn: async ({ page, size }: DiscussionListProps) => {
      const res = await DiscussionService.getDiscussionList({
        page,
        size,
      })
      return res.data
    },
  },

  discussionDetail: {
    queryKey: (id: number) => queryKeys.discussion(id),
    queryFn: async (id: number) => {
      const res = await DiscussionService.getDiscussionDetail(id)
      return res.data
    },
  },

  postDiscussion: {
    queryKey: queryKeys.discussionList,
    mutationFn: async (discussion: FormData): Promise<void> => {
      await DiscussionService.postDiscussion(discussion)
    },
  },

  deleteDiscussion: {
    queryKey: queryKeys.discussionList,
    mutationFn: async (id: number): Promise<void> => {
      await DiscussionService.deleteDiscussion(id)
    },
  },

  postDiscussionPraticipation: {
    queryKey: queryKeys.discussionList,
    mutationFn: async ({
      discussionId,
      discussionOptionId,
    }: DicussionParticipationProps): Promise<void> => {
      await DiscussionService.postDiscussionPraticipation({
        discussionId,
        discussionOptionId,
      })
    },
  },
}

export { queryKeys, queryOptions }
