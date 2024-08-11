import EvaluationService, { EvaluationProps } from './EvaluationService'

const queryKeys = {
  evaluation: 'evaluation',
}

const queryOptions = {
  postEvaluation: {
    queryKey: queryKeys.evaluation,
    mutationFn: async (Evaluation: EvaluationProps): Promise<void> => {
      await EvaluationService.postEvaluation(Evaluation)
    },
  },
}

export { queryKeys, queryOptions }
