import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from '@tanstack/react-query'
import { queryOptions } from './WorryQueries'
import { WorryPatchProps } from './WorryService'

const useWaitingWorryList = (
  page: number,
  size: number,
  strFromMbti: string,
  strToMbti: string,
) => {
  return useQuery({
    queryKey: ['worryList', page, size, strFromMbti, strToMbti],
    queryFn: () =>
      queryOptions.waitingWorryList.queryFn({
        page,
        size,
        strFromMbti,
        strToMbti,
      }),
  })
}

const useWaitingWorryListMember = (
  memberId: number,
  page: number,
  size: number,
) => {
  return useQuery({
    queryKey: ['worryListMember', memberId, page, size],
    queryFn: () =>
      queryOptions.waitingWorryListMember.queryFn({ memberId, page, size }),
  })
}

const useSolvedWorryList = (
  page: number,
  size: number,
  strFromMbti: string,
  strToMbti: string,
) => {
  return useQuery({
    queryKey: ['worryList', page, size, strFromMbti, strToMbti],
    queryFn: () =>
      queryOptions.solvedWorryList.queryFn({
        page,
        size,
        strFromMbti,
        strToMbti,
      }),
  })
}

const useSolvedWorryListMember = (
  memberId: number,
  page: number,
  size: number,
) => {
  return useQuery({
    queryKey: ['worryListMember', memberId, page, size],
    queryFn: () =>
      queryOptions.solvedWorryListMember.queryFn({ memberId, page, size }),
  })
}

const useWorryDetail = (worryId: number) => {
  return useQuery({
    queryKey: ['worryDetail', worryId],
    queryFn: () => queryOptions.worryDetail.queryFn(worryId),
  })
}

const usePostWorry = () => {
  const mutationFn = (worry: FormData): Promise<void> =>
    queryOptions.postWorry.mutationFn(worry)

  const options: UseMutationOptions<void, Error, FormData, unknown> = {
    mutationFn,
  }
  return useMutation<void, Error, FormData>(options)
}

const usePostWorryImage = () => {
  const mutationFn = async (worryImage: FormData): Promise<string> => {
    const response = await queryOptions.postWorryImage.mutationFn(worryImage)
    return response
  }
  const options: UseMutationOptions<string, Error, FormData, unknown> = {
    mutationFn,
  }
  return useMutation<string, Error, FormData>(options)
}

const usePatchWorry = () => {
  const mutationFn = ({ id, worry }: WorryPatchProps): Promise<void> =>
    queryOptions.patchWorry.mutationFn({ id, worry })

  const options: UseMutationOptions<void, Error, WorryPatchProps, unknown> = {
    mutationFn,
  }
  return useMutation<void, Error, WorryPatchProps>(options)
}

const useDeleteWorry = () => {
  const mutationFn = (id: number): Promise<void> =>
    queryOptions.deleteWorry.mutationFn(id)

  const options: UseMutationOptions<void, Error, number, unknown> = {
    mutationFn,
  }
  return useMutation<void, Error, number>(options)
}

const usePatchWorrySolved = () => {
  const mutationFn = (worryId: number): Promise<void> =>
    queryOptions.patchWorrySolved.mutationFn(worryId)

  const options: UseMutationOptions<void, Error, number, unknown> = {
    mutationFn,
  }
  return useMutation<void, Error, number>(options)
}

export {
  useWaitingWorryList,
  useWaitingWorryListMember,
  useSolvedWorryList,
  useSolvedWorryListMember,
  useWorryDetail,
  usePostWorry,
  usePostWorryImage,
  usePatchWorry,
  useDeleteWorry,
  usePatchWorrySolved,
}
