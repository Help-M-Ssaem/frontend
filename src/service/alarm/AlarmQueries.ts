import AlarmService, { AlarmListProps } from './alarmService'

const queryKeys = {
  alarmList: ['AlarmList'] as const,
}

const queryOptions = {
  alarmList: {
    queryKey: queryKeys.alarmList,
    queryFn: async ({ page, size }: AlarmListProps) => {
      const res = await AlarmService.getAlarmList({
        page,
        size,
      })
      return res.data
    },
  },

  patchAlarmAll: {
    queryKey: queryKeys.alarmList,
    mutationFn: async (): Promise<void> => {
      await AlarmService.patchAlarmAll()
    },
  },

  patchAlarm: {
    queryKey: queryKeys.alarmList,
    mutationFn: async (id: number): Promise<void> => {
      await AlarmService.patchAlarm(id)
    },
  },

  deleteAlarmAll: {
    queryKey: queryKeys.alarmList,
    mutationFn: async (): Promise<void> => {
      await AlarmService.deteleAlarmAll()
    },
  },

  deleteAlarm: {
    queryKey: queryKeys.alarmList,
    mutationFn: async (id: number): Promise<void> => {
      await AlarmService.deleteAlarm(id)
    },
  },
}

export { queryKeys, queryOptions }
