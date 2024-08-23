import { useQuery } from '@tanstack/react-query'
import { queryOptions } from './HomeQueries'

const useHotThree = () => useQuery(queryOptions.hotThree)

const useHotBoard = () => useQuery(queryOptions.hotBoard)

const useHotBoardMore = (page: number, size: number) =>
  useQuery({
    ...queryOptions.hotBoardMore,
    queryKey: ['hotBoardMore', page, size],
    queryFn: () => queryOptions.hotBoardMore.queryFn({ page, size }),
  })

const useHotDiscussion = () => useQuery(queryOptions.hotDiscussion)

const useHotDiscussionMore = (page: number, size: number) =>
  useQuery({
    ...queryOptions.hotDiscussionMore,
    queryKey: ['hotDiscussionMore', page, size],
    queryFn: () => queryOptions.hotDiscussionMore.queryFn({ page, size }),
  })

const useWorry = () => useQuery(queryOptions.worry)

const usePopularProfile = () => useQuery(queryOptions.popularProfile)

export {
  useHotThree,
  useHotBoard,
  useHotBoardMore,
  useHotDiscussion,
  useHotDiscussionMore,
  useWorry,
  usePopularProfile,
}
