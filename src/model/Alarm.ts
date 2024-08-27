interface AlarmI {
  id: number
  resourceId: number
  notificationTypeContent: string
  content: string
  createdAt: string
  state: boolean
  notificationType: string
}

interface AlarmListI {
  page: number
  totalSize: number
  result: AlarmI[]
}

export type { AlarmI, AlarmListI }
