import { MBTI } from '@/components/common/Button'
import { User } from './User'

interface ChattingMessageI {
  message: string
  timestamp: string
  memberId: string
}

interface ChattingRoomI {
  chatRoomId: number
  chatRoomTitle: string
  memberSimpleInfo: User
  targetMbti: MBTI
  worryBoardId: number
  lastMessage: string
  lastSendAt: string
  state: boolean
}

export type { ChattingMessageI, ChattingRoomI }
