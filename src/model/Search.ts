import { BoardI, BoardList } from './Board'
import { DiscussionBoardI, DiscussionList } from './Discussion'
import { WorryI, WorryList } from './Worry'

interface BoardSearch {
  page: number
  totalSize: number
  result: BoardI[]
}

interface WorrySearch {
  page: number
  totalSize: number
  result: WorryI[]
}

interface DiscussionSearch {
  page: number
  totalSize: number
  result: DiscussionBoardI[]
}

interface RealtimeSearch {
  keyword: string
  score: number
}

interface KeywordSearch {
  boardSimpleInfos: BoardList
  getWorriesRes: WorryList
  discussionSimpleInfo: DiscussionList
}

export type {
  BoardSearch,
  WorrySearch,
  DiscussionSearch,
  RealtimeSearch,
  KeywordSearch,
}
