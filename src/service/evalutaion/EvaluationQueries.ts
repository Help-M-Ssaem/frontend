import EvaluationService, { EvaluationProps } from './EvaluationService'

const queryKeys = {
  evaluation: 'evaluation',
}

const queryOptions = {
  evaluationCount: {
    queryKey: queryKeys.evaluation,
    queryFn: async (id: number): Promise<number> => {
      const response = await EvaluationService.getEvaluationCount(id)
      return response.data
    },
  },

  postEvaluation: {
    queryKey: queryKeys.evaluation,
    mutationFn: async (Evaluation: EvaluationProps): Promise<void> => {
      await EvaluationService.postEvaluation(Evaluation)
    },
  },
}

export { queryKeys, queryOptions }
