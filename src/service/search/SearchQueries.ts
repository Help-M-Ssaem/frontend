import SearchService, { SearchProps } from './SearchService'

const queryKeys = {
  boardSearch: 'boardSearch',
  solvedWorrySearch: 'solvedWorrySearch',
  waitingWorrySearch: 'waitingWorrySearch',
  discussionSearch: 'discussionSearch',
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
}

export { queryKeys, queryOptions }
