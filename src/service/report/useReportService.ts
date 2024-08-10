import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { queryOptions } from './ReportQueries'
import { ReportProps } from './ReportService'

const usePostReport = () => {
  const mutationFn = (Report: ReportProps): Promise<void> =>
    queryOptions.postReport.mutationFn(Report)

  const options: UseMutationOptions<void, Error, ReportProps, unknown> = {
    mutationFn,
  }
  return useMutation<void, Error, ReportProps>(options)
}

export { usePostReport }
