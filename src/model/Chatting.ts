import { MBTI, Color } from '@/components/common/Button'

interface ChattingProfileI {
  nickName: string
  mbti: MBTI
  badge?: Color
  profileImgUrl: string
  recent?: string
  lastMessage: string
}

export default ChattingProfileI
