import { ChattingRoomI } from '@/model/Chatting'
import { atom } from 'recoil'

export const chatRoomsState = atom<ChattingRoomI[] | null>({
  key: 'chatRoomsState',
  default: null,
})
