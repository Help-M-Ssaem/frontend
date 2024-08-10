import Service from '@/apis/AxiosInstance'

export interface ReportProps {
  resourceId: number
  reportTarget: string
  reportReason: string
  content: string
}

class ReportService extends Service {
  postReport(report: ReportProps) {
    return this.http.post(`/member/reports`, report)
  }
}

export default new ReportService()
