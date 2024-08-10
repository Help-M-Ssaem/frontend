import { BoardDetail } from './Board'
import { DiscussionBoardI } from './Discussion'
import { WorryI } from './Worry'

interface BoardSearch {
  page: number
  totalSize: number
  result: BoardDetail[]
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
  boardSimpleInfos: BoardSearch
  getWorriesRes: WorrySearch
  discussionSimpleInfo: DiscussionSearch
}

export type {
  BoardSearch,
  WorrySearch,
  DiscussionSearch,
  RealtimeSearch,
  KeywordSearch,
}
