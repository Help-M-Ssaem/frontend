import ReportService, { ReportProps } from './ReportService'

const queryKeys = {
  report: 'report',
}

const queryOptions = {
  postReport: {
    queryKey: queryKeys.report,
    mutationFn: async (Report: ReportProps): Promise<void> => {
      await ReportService.postReport(Report)
    },
  },
}

export { queryKeys, queryOptions }
