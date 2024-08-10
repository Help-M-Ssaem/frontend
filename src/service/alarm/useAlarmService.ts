import {
  useMutation,
  useQuery,
  UseMutationOptions,
} from '@tanstack/react-query'
import { queryOptions } from './AlarmQueries'

const useAlarmList = (page: number, size: number) =>
  useQuery({
    ...queryOptions.alarmList,
    queryKey: ['AlarmList', page, size],
    queryFn: () => queryOptions.alarmList.queryFn({ page, size }),
  })

const usePatchAlarmAll = () => {
  const mutationFn = (): Promise<void> =>
    queryOptions.patchAlarmAll.mutationFn()

  const options: UseMutationOptions<void, Error, unknown, unknown> = {
    mutationFn,
  }
  return useMutation<void, Error, unknown>(options)
}

const usePatchAlarm = () => {
  const mutationFn = (id: number): Promise<void> =>
    queryOptions.patchAlarm.mutationFn(id)

  const options: UseMutationOptions<void, Error, number, unknown> = {
    mutationFn,
  }
  return useMutation<void, Error, number>(options)
}

const useDeleteAlarmAll = () => {
  const mutationFn = (): Promise<void> =>
    queryOptions.deleteAlarmAll.mutationFn()

  const options: UseMutationOptions<void, Error, unknown, unknown> = {
    mutationFn,
  }
  return useMutation<void, Error, unknown>(options)
}

const useDeleteAlarm = () => {
  const mutationFn = (id: number): Promise<void> =>
    queryOptions.deleteAlarm.mutationFn(id)

  const options: UseMutationOptions<void, Error, number, unknown> = {
    mutationFn,
  }
  return useMutation<void, Error, number>(options)
}

export {
  useAlarmList,
  usePatchAlarmAll,
  usePatchAlarm,
  useDeleteAlarmAll,
  useDeleteAlarm,
}
