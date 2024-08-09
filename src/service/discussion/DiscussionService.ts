import Service from '@/apis/AxiosInstance'
import { DiscussionDetail, DiscussionList } from '@/model/Discussion'

export interface DiscussionListProps {
  page: number
  size: number
}

export interface DicussionParticipationProps {
  discussionId: number
  discussionOptionId: number
}

class DiscussionService extends Service {
  getDiscussionList({ page, size }: DiscussionListProps) {
    return this.http.get<DiscussionList>(
      `/discussions?page=${page}&size=${size}`,
    )
  }

  getDiscussionDetail(id: number) {
    return this.http.get<DiscussionDetail>(`/discussion/${id}`)
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
  }: DicussionParticipationProps) {
    return this.http.post(
      `/member/discussions/${discussionId}/discussion-options/${discussionOptionId}`,
    )
  }
}

export default new DiscussionService()
