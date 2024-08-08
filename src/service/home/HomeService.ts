import Service from '@/apis/AxiosInstance'
import {
  HotBoardI,
  HotBoardMore,
  HotDiscussionI,
  HotDiscussionMore,
  HotThreeI,
} from '@/model/Home'
import { WorryI } from '@/model/Worry'

interface HotMoreProps {
  page: number
  size: number
}

class HomeService extends Service {
  getHotThree() {
    return this.http.get<HotThreeI>(`/three-hot`)
  }

  getHotBoard() {
    return this.http.get<HotBoardI[]>(`/boards/home`)
  }

  getHotBoardMore({ page, size }: HotMoreProps) {
    return this.http.get<HotBoardMore>(`/boards/hot?page=${page}&size=${size}`)
  }

  getHotDiscussion() {
    return this.http.get<HotDiscussionI[]>(`/discussions/home`)
  }

  getHotDiscussionMore({ page, size }: HotMoreProps) {
    return this.http.get<HotDiscussionMore>(
      `/discussions/hot?page=${page}&size=${size}`,
    )
  }

  getWorry() {
    return this.http.get<WorryI[]>(`/worry-board/home`)
  }

  getPopularMssaem() {
    return this.http.get(`/teacher`)
  }
}

export default new HomeService()
