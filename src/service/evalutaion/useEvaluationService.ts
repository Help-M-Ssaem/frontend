import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { queryOptions } from './EvaluationQueries'
import { EvaluationProps } from './EvaluationService'

const usePostEvaluation = () => {
  const mutationFn = (evaluation: EvaluationProps): Promise<void> =>
    queryOptions.postEvaluation.mutationFn(evaluation)

  const options: UseMutationOptions<void, Error, EvaluationProps, unknown> = {
    mutationFn,
  }
  return useMutation<void, Error, EvaluationProps>(options)
}

export { usePostEvaluation }
