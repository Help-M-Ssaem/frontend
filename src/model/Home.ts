import { BoardI } from './Board'
import { DiscussionBoardI, DiscussionOptionI } from './Discussion'
import { User } from './User'

interface HotThreeI {
  boardId: number
  boardTitle: string
  discussionId: number
  discussionTitle: string
  worryBoardId: number
  worryBoardTitle: string
}

interface HotBoardI {
  id: number
  title: string
  content: string
  imgUrl?: string
  boardMbti: string
  likeCount: number
  commentCount: number
  createdAt: string
  memberSimpleInfo: User
}

interface HotBoardMore {
  page: number
  totalSize: number
  result: BoardI[]
}

interface HotDiscussionI {
  id: number
  title: string
  content: string
  participantCount: number
  commentCount: number
  createdAt: string
  memberSimpleInfo: User
  options?: DiscussionOptionI[]
}

interface HotDiscussionMore {
  page: number
  totalSize: number
  result: DiscussionBoardI[]
}

export type {
  HotThreeI,
  HotBoardI,
  HotBoardMore,
  HotDiscussionI,
  HotDiscussionMore,
}
