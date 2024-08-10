import Service from '@/apis/AxiosInstance'
import { CommentList } from '@/model/Comment'

export interface CommentListProps {
  id: number
  page: number
  size: number
}

export interface PostCommentProps {
  id: number
  comment: FormData
  commentId?: number
}

export interface CommentDetailProps {
  id: number
  commentId: number
}

class CommentService extends Service {
  // 게시판
  getCommentList({ id, page, size }: CommentListProps) {
    return this.http.get<CommentList>(
      `/boards/${id}/comments?page=${page}&size=${size}`,
    )
  }

  getCommentListMember({ id, page, size }: CommentListProps) {
    return this.http.get<CommentList>(
      `/boards/comments?memberId=${id}&page=${page}&size=${size}`,
    )
  }

  getCommentBest({ id, page, size }: CommentListProps) {
    return this.http.get<Comment>(
      `/boards/${id}/comments/best?page=${page}&size=${size}`,
    )
  }

  postCommentLike({ id, commentId }: CommentDetailProps) {
    return this.http.post(`/member/boards/${id}/comments/${commentId}/like`)
  }

  postComment({ id, comment, commentId }: PostCommentProps) {
    const url = commentId
      ? `/member/boards/${id}/comments?commentId=${commentId}`
      : `/member/boards/${id}/comments`

    return this.http.post(url, comment, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  deleteComment({ id, commentId }: CommentDetailProps) {
    return this.http.delete(`/member/boards/${id}/comments/${commentId}`)
  }

  // 토론 게시판
  getDiscussionCommentList({ id, page, size }: CommentListProps) {
    return this.http.get<CommentList>(
      `/discussions/${id}/comments?page=${page}&size=${size}`,
    )
  }

  getDiscussionCommentListMember({ id, page, size }: CommentListProps) {
    return this.http.get<CommentList>(
      `/discussions/comments?memberId=${id}&page=${page}&size=${size}`,
    )
  }

  getDiscussionCommentBest({ id, page, size }: CommentListProps) {
    return this.http.get<Comment>(
      `/discussions/${id}/comments/best?page=${page}&size=${size}`,
    )
  }

  postDiscussionCommentLike({ id, commentId }: CommentDetailProps) {
    return this.http.post(`/discussions/${id}/comments/${commentId}/like`)
  }

  postDiscussionComment({ id, comment, commentId }: PostCommentProps) {
    const url = commentId
      ? `/member/discussions/${id}/comments?commentId=${commentId}`
      : `/member/discussions/${id}/comments`

    return this.http.post(url, comment, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  deleteDiscussionComment({ id, commentId }: CommentDetailProps) {
    return this.http.delete(`/member/boards/${id}/comments/${commentId}`)
  }
}

export default new CommentService()
