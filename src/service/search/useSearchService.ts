import { useQuery } from '@tanstack/react-query'
import { MBTI } from '@/components/common/Button'
import { queryOptions } from './SearchQueries'

const useBoardSearch = (
  searchType: number,
  keyword: string,
  strMbti: MBTI,
  page: number,
  size: number,
) =>
  useQuery({
    ...queryOptions.boardSearch,
    queryKey: ['boardSearch', searchType, keyword, strMbti, page, size],
    queryFn: () =>
      queryOptions.boardSearch.queryFn({
        searchType,
        keyword,
        strMbti,
        page,
        size,
      }),
  })

const useSolvedWorrySearch = (
  searchType: number,
  keyword: string,
  strFromMbti: MBTI,
  strToMbti: MBTI,
  page: number,
  size: number,
) =>
  useQuery({
    ...queryOptions.boardSearch,
    queryKey: [
      'solvedWorrySearch',
      searchType,
      keyword,
      strFromMbti,
      strToMbti,
      page,
      size,
    ],
    queryFn: () =>
      queryOptions.boardSearch.queryFn({
        searchType,
        keyword,
        strFromMbti,
        strToMbti,
        page,
        size,
      }),
  })

const useWaitingWorrySearch = (
  searchType: number,
  keyword: string,
  strFromMbti: MBTI,
  strToMbti: MBTI,
  page: number,
  size: number,
) =>
  useQuery({
    ...queryOptions.boardSearch,
    queryKey: [
      'waitingWorrySearch',
      searchType,
      keyword,
      strFromMbti,
      strToMbti,
      page,
      size,
    ],
    queryFn: () =>
      queryOptions.boardSearch.queryFn({
        searchType,
        keyword,
        strFromMbti,
        strToMbti,
        page,
        size,
      }),
  })

const useDiscussionSearch = (
  searchType: number,
  keyword: string,
  page: number,
  size: number,
) =>
  useQuery({
    ...queryOptions.boardSearch,
    queryKey: ['discussionSearch', searchType, keyword, page, size],
    queryFn: () =>
      queryOptions.boardSearch.queryFn({
        searchType,
        keyword,
        page,
        size,
      }),
  })

export {
  useBoardSearch,
  useSolvedWorrySearch,
  useWaitingWorrySearch,
  useDiscussionSearch,
}
