import { MBTI } from '@/components/common/Button'
import { User } from './User'

interface WorryI {
  id: number
  title: string
  content: string
  memberMbti: MBTI
  targetMbti: MBTI
  createdDate: string
  imgUrl: string
}

interface WorryList {
  page: number
  totalSize: number
  result: WorryI[]
}

interface WorryDetail {
  memberSimpleInfo: User
  worryBoardId: number
  targetMbti: MBTI
  title: string
  content: string
  createdAt: string
  imgList: string[]
  isEditAllowed: boolean
  isChatAllowed: boolean
  chatRoomId: number
  hits: number
}

export type { WorryI, WorryList, WorryDetail }
