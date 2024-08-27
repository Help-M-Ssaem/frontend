import { User } from './User'

interface CommentI {
  commentId: number
  likeCount: number
  parentId: number
  createdAt: string
  isLiked: boolean
  isEditAllowed: boolean
  memberSimpleInfo: User
  content: string
}

interface CommentList {
  page: number
  totalSize: number
  result: CommentI[]
}

export type { CommentI, CommentList }
