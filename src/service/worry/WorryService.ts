import Service from '@/apis/AxiosInstance'
import { WorryDetail, WorryList } from '@/model/Worry'

export interface WorryListProps {
  page: number
  size: number
  strFromMbti: string
  strToMbti: string
}

export interface WorryPatchProps {
  id: number
  worry: FormData
}

class WorryService extends Service {
  getWaitingWorryList({ page, size, strFromMbti, strToMbti }: WorryListProps) {
    return this.http.get<WorryList>(
      `/worry-board/waiting/filter?page=${page}&size=${size}&strFromMbti=${strFromMbti}&strToMbti=${strToMbti}`,
    )
  }

  getSolvedWorryList({ page, size, strFromMbti, strToMbti }: WorryListProps) {
    return this.http.get<WorryList>(
      `/worry-board/solved/filter?page=${page}&size=${size}&strFromMbti=${strFromMbti}&strToMbti=${strToMbti}`,
    )
  }

  getWorryDetail(id: number) {
    return this.http.get<WorryDetail>(`/worry-board/${id}`)
  }

  postWorry(worry: FormData) {
    return this.http.post(`/member/worry-board`, worry, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  patchWorry({ id, worry }: WorryPatchProps) {
    return this.http.patch(`/member/worry-board/${id}`, worry, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  deleteWorry(id: number) {
    return this.http.delete(`/member/worry-board/${id}`)
  }

  patchWorrySolved(id: number) {
    return this.http.patch(`/member/worry-board/${id}/solved`)
  }
}

export default new WorryService()
