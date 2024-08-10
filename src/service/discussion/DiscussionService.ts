import Service from '@/apis/AxiosInstance'
import { DiscussionDetail, DiscussionList } from '@/model/Discussion'

export interface DiscussionListProps {
  id?: number
  page: number
  size: number
}

export interface DiscussionParticipationProps {
  discussionId: number
  discussionOptionId: number
}

class DiscussionService extends Service {
  getDiscussionList({ page, size }: DiscussionListProps) {
    return this.http.get<DiscussionList>(
      `/discussions?page=${page}&size=${size}`,
    )
  }

  getDiscussionListMember({ id, page, size }: DiscussionListProps) {
    return this.http.get<DiscussionList>(
      `/boards/member?memberId=${id}&page=${page}&size=${size}`,
    )
  }

  getDiscussionDetail(id: number) {
    return this.http.get<DiscussionDetail>(`/discussions/${id}`)
  }

  postDiscussion(discussion: FormData) {
    return this.http.post(`/member/discussion`, discussion, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  deleteDiscussion(id: number) {
    return this.http.delete(`/member/discussion/${id}`)
  }

  postDiscussionPraticipation({
    discussionId,
    discussionOptionId,
  }: DiscussionParticipationProps) {
    return this.http.post(
      `/member/discussions/${discussionId}/discussion-options/${discussionOptionId}`,
    )
  }
}

export default new DiscussionService()
