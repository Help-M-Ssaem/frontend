import { MBTI } from '@/components/common/Button'
import { User } from './User'

interface ChattingMessageI {
  message: string
  createdAt: string
  sendWho: boolean
}

interface ChattingRoomI {
  chatRoomId: number
  chatRoomTitle: string
  memberSimpleInfo: User
  targetMbti: MBTI
  worryBoardId: number
  lastMessage: string
  lastSendAt: string
}

export type { ChattingMessageI, ChattingRoomI }
