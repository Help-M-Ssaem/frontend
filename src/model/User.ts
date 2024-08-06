import { MBTI } from '@/components/common/Button'

interface User {
  nickName: string
  mbti: MBTI
  badge: string
  profileImgUrl: string
}

interface Profile {
  teacherInfo: User
  badgeInfos: string[]
  evaluaionCount: {
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
    sovledWorryBoardCount: number
    evaluationCount: number
  }
}

interface PopularMssaemI {
  id: number
  nickName: string
  mbti: MBTI
  badge: MBTI
  profileImageurl: string
  introduction: string
}

export type { User, Profile, PopularMssaemI }
