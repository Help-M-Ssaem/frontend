import Service from '@/apis/AxiosInstance'
import { WorryDetail, WorryList } from '@/model/Worry'

export interface WorryListProps {
  page: number
  size: number
  strFromMbti: string
  strToMbti: string
}

export interface WorryListMemberProps {
  memberId: number
  page: number
  size: number
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

  getWaitingWorryListMember({ memberId, page, size }: WorryListMemberProps) {
    return this.http.get<WorryList>(
      `/worry-board/waiting-list?memberId=${memberId}&page=${page}&size=${size}`,
    )
  }

  getSolvedWorryList({ page, size, strFromMbti, strToMbti }: WorryListProps) {
    return this.http.get<WorryList>(
      `/worry-board/solved/filter?page=${page}&size=${size}&strFromMbti=${strFromMbti}&strToMbti=${strToMbti}`,
    )
  }

  getSolvedWorryListMember({ memberId, page, size }: WorryListMemberProps) {
    return this.http.get<WorryList>(
      `/worry-board/solve-list?memberId=${memberId}&page=${page}&size=${size}`,
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

  postWorryImage(image: FormData) {
    return this.http
      .post(`/member/worry-boards/files`, image, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        return response.data
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

  postChattingRoom({ worryBoardId }: { worryBoardId: number }) {
    return this.http.post(`chatroom?worryBoardId=${worryBoardId}`)
  }
}

export default new WorryService()
