import Service from '@/apis/AxiosInstance'

export interface EvaluationProps {
  worryBoardId: number
  evaluation: string[]
}

class EvaluationService extends Service {
  postEvaluation(Evaluation: EvaluationProps) {
    return this.http.post(`/member/evaluations`, Evaluation)
  }
}

export default new EvaluationService()
