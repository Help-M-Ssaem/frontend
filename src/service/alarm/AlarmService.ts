import Service from '@/apis/AxiosInstance'
import { AlarmListI } from '@/model/Alarm'

export interface AlarmListProps {
  page: number
  size: number
}

class AlarmService extends Service {
  getAlarmList({ page, size }: AlarmListProps) {
    return this.http.get<AlarmListI>(
      `/member/notifications?page=${page}&size=${size}`,
    )
  }

  patchAlarmAll() {
    return this.http.patch(`/member/notifications/all`)
  }

  patchAlarm(id: number) {
    return this.http.patch(`/member/notifications?id=${id}`)
  }

  deteleAlarmAll() {
    return this.http.delete(`/member/notifications/all`)
  }

  deleteAlarm(id: number) {
    return this.http.delete(`/member/notifications?id=${id}`)
  }
}

export default new AlarmService()
