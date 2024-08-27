import { User } from './User'

interface DiscussionList {
  page: number
  totalSize: number
  result: DiscussionBoardI[]
}

interface DiscussionDetail {
  discussionSimpleInfo: DiscussionBoardI
  isEditAllowed: boolean
}

interface DiscussionBoardI {
  id: number
  title: string
  content: string
  participantCount: number
  commentCount: number
  createdAt: string
  memberSimpleInfo: User
  options: DiscussionOptionI[]
}

interface DiscussionOptionI {
  id: number
  content: string | null
  imgUrl: string | null
  selectedPercent: string
  selected: boolean
}

export type {
  DiscussionList,
  DiscussionDetail,
  DiscussionBoardI,
  DiscussionOptionI,
}
