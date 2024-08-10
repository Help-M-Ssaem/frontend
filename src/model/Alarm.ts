interface Alarm {
  resourceId: number
  notificatoinTypeContent: string
  content: string
  createdAt: string
  state: boolean
  type: string
}

interface AlarmList {
  page: number
  totalSize: number
  result: Alarm[]
}

export type { Alarm, AlarmList }
