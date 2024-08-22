import { Color, MBTI } from '@/components/common/Button'

interface User {
  id: number
  nickName: string
  mbti: MBTI
  badge: Color
  profileImgUrl: string
  introduction?: string
  badgeId?: number
}

interface Badge {
  id: number
  name: Color
  status: boolean
  imgUrl: string
}

interface Profile {
  teacherInfo: User
  badgeInfos: Badge[]
  evaluationCount: {
    likeCount: number
    usefulCount: number
    funCount: number
    sincereCount: number
    hotCount: number
  }
  boardHistory: {
    boardCount: number
    boardCommentCount: number
    likeAllCount: number
  }
  discussionHistory: {
    discussionCount: number
    discussionCommentCount: number
    participationCount: number
  }
  worryBoardHistory: {
    worryBoardCount: number
    solvedWorryBoardCount: number
    evaluationCount: number
  }
}

interface Signup {
  email: string
  nickName: string
  mbti: string
  caseSensitivity: string
}

export type { User, Profile, Signup }
