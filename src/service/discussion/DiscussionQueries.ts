import { DiscussionOptionI } from '@/model/Discussion'
import DiscussionService, {
  DiscussionParticipationProps,
  DiscussionListProps,
} from './DiscussionService'

const queryKeys = {
  discussion: (discussionId: number) => ['discussion', discussionId] as const,
  discussionList: ['discussionList'] as const,
  discussionListImage: ['discussionListImage'] as const,
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

  discussionListMember: {
    queryKey: (id: number) => queryKeys.discussion(id),
    queryFn: async ({ id, page, size }: DiscussionListProps) => {
      const res = await DiscussionService.getDiscussionListMember({
        id,
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

  postDiscussionOptionFiles: {
    queryKey: queryKeys.discussionListImage,
    mutationFn: async (image: FormData): Promise<string> => {
      const response = await DiscussionService.postDiscussionOptionFiles(image)
      return response
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
    }: DiscussionParticipationProps): Promise<DiscussionOptionI[]> => {
      const res = await DiscussionService.postDiscussionPraticipation({
        discussionId,
        discussionOptionId,
      })
      return res.data
    },
  },
}

export { queryKeys, queryOptions }
