import SearchService, { SearchProps } from './SearchService'

const queryKeys = {
  boardSearch: ['boardSearch'] as const,
  solvedWorrySearch: ['solvedWorrySearch'] as const,
  waitingWorrySearch: ['waitingWorrySearch'] as const,
  discussionSearch: ['discussionSearch'] as const,
  realtimeKeywords: ['realtimeKeywords'] as const,
  recentKeywords: ['recentKeywords'] as const,
}

const queryOptions = {
  boardSearch: {
    queryKey: queryKeys.boardSearch,
    queryFn: async ({
      searchType,
      keyword,
      strMbti,
      page,
      size,
    }: SearchProps) => {
      const res = await SearchService.getBoardSearch({
        searchType,
        keyword,
        strMbti,
        page,
        size,
      })
      return res.data
    },
  },

  solvedWorrySearch: {
    queryKey: queryKeys.boardSearch,
    queryFn: async ({
      searchType,
      keyword,
      strFromMbti,
      strToMbti,
      page,
      size,
    }: SearchProps) => {
      const res = await SearchService.getSolvedWorrySearch({
        searchType,
        keyword,
        strFromMbti,
        strToMbti,
        page,
        size,
      })
      return res.data
    },
  },

  waitingWorrySearch: {
    queryKey: queryKeys.boardSearch,
    queryFn: async ({
      searchType,
      keyword,
      strFromMbti,
      strToMbti,
      page,
      size,
    }: SearchProps) => {
      const res = await SearchService.getWaitingWorrySearch({
        searchType,
        keyword,
        strFromMbti,
        strToMbti,
        page,
        size,
      })
      return res.data
    },
  },

  discussionSearch: {
    queryKey: queryKeys.boardSearch,
    queryFn: async ({ searchType, keyword, page, size }: SearchProps) => {
      const res = await SearchService.getDiscussionSearch({
        searchType,
        keyword,
        page,
        size,
      })
      return res.data
    },
  },

  realtimeKeywords: {
    queryKey: 'realtimeKeywords',
    queryFn: async () => {
      const res = await SearchService.getRealtimeKeywords()
      return res.data
    },
  },

  recentKeywords: {
    queryKey: 'recentKeywords',
    queryFn: async () => {
      const res = await SearchService.getRecentKeywords()
      return res.data
    },
  },

  keywordSearch: {
    queryKey: queryKeys.boardSearch,
    mutationFn: async (keyword: string) => {
      const res = await SearchService.postKeywordSearch(keyword)
      return res.data
    },
  },
}

export { queryKeys, queryOptions }
