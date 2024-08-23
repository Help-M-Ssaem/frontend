import Service from '@/apis/AxiosInstance'
import { BoardDetail, BoardList, BoardListNumber } from '@/model/Board'

export interface BoardListProps {
  mbti: string
  page: number
  size: number
}

export interface BoardListFilteredProps {
  boardId: number
  page: number
  size: number
}

export interface BoardListMemberProps {
  memberId: number
  page: number
  size: number
}

export interface BoardPatchProps {
  id: number
  board: FormData
}

class BoardService extends Service {
  getBoardList({ mbti, page, size }: BoardListProps) {
    const url =
      mbti === 'all'
        ? `/boards?page=${page}&size=${size}`
        : `/boards/mbti?mbti=${mbti}&page=${page}&size=${size}`

    return this.http.get<BoardList>(url)
  }

  getBoardListFiltered({ boardId, page, size }: BoardListFilteredProps) {
    return this.http.get<BoardList>(
      `/boards?page=${page}&size=${size}&boardId=${boardId}`,
    )
  }

  getBoardListMember({ memberId, page, size }: BoardListMemberProps) {
    return this.http.get<BoardList>(
      `/boards/member?memberId=${memberId}&page=${page}&size=${size}`,
    )
  }

  getBoardListNumber() {
    return this.http.get<BoardListNumber>('/boards/list')
  }

  getBoardDetail(boardId: number) {
    return this.http.get<BoardDetail>(`/boards/${boardId}`)
  }

  getCategoryBookmark() {
    return this.http.get('/member/bookmark')
  }

  postCategoryBookmark(mbti: string) {
    return this.http.post(`/member/bookmark?mbtiEnum=${mbti}`)
  }

  postBoardLike(boardId: number) {
    return this.http.post(`/member/boards/${boardId}/like`)
  }

  postBoard(board: FormData) {
    return this.http.post(`/member/boards`, board, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  postBoardImage(boardImage: FormData) {
    return this.http
      .post(`/member/boards/files`, boardImage, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        return response.data
      })
  }

  patchBoard({ id, board }: BoardPatchProps) {
    return this.http.patch(`/member/boards/${id}`, board, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  deleteBoard(id: number) {
    return this.http.delete(`/member/boards/${id}`)
  }
}

export default new BoardService()
