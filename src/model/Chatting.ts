import { MBTI } from '@/components/common/Button'
import { User } from './User'

interface ChattingMessageI {
  content: string
  sendAt: string
}

interface ChattingRoomI {
  chatRoomId: number
  lastMessage: string
  lastSendAt: string
  chatRoomTitle: string
  memberMbti: MBTI
  targetMbti: MBTI
  memberSimpleInfo: User
}

export type { ChattingMessageI, ChattingRoomI }
