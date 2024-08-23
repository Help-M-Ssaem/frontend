import HomeService from './HomeService'

const queryKeys = {
  hotThree: ['hotThree'] as const,
  hotBoard: ['hotBoard'] as const,
  hotBoardMore: ['hotBoardMore'] as const,
  hotDiscussion: ['hotDiscussion'] as const,
  hotDiscussionMore: ['hotDiscussionMore'] as const,
  worry: ['worry'] as const,
  popularProfile: ['popularProfile'] as const,
}

interface HotMoreProps {
  page: number
  size: number
}

const queryOptions = {
  hotThree: {
    queryKey: queryKeys.hotThree,
    queryFn: async () => {
      const res = await HomeService.getHotThree()
      return res.data
    },
  },
  hotBoard: {
    queryKey: queryKeys.hotBoard,
    queryFn: async () => {
      const res = await HomeService.getHotBoard()
      return res.data
    },
  },
  hotBoardMore: {
    queryKey: queryKeys.hotBoardMore,
    queryFn: async ({ page, size }: HotMoreProps) => {
      const res = await HomeService.getHotBoardMore({ page, size })
      return res.data
    },
  },
  hotDiscussion: {
    queryKey: queryKeys.hotDiscussion,
    queryFn: async () => {
      const res = await HomeService.getHotDiscussion()
      return res.data
    },
  },
  hotDiscussionMore: {
    queryKey: queryKeys.hotDiscussionMore,
    queryFn: async ({ page, size }: HotMoreProps) => {
      const res = await HomeService.getHotDiscussionMore({ page, size })
      return res.data
    },
  },
  worry: {
    queryKey: queryKeys.worry,
    queryFn: async () => {
      const res = await HomeService.getWorry()
      return res.data
    },
  },
  popularProfile: {
    queryKey: queryKeys.popularProfile,
    queryFn: async () => {
      const res = await HomeService.getPopularProfile()
      return res.data
    },
  },
}

export { queryKeys, queryOptions }
