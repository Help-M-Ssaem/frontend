import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from '@tanstack/react-query'
import { Profile } from '@/model/User'
import queryOptions from './UserQueries'

const useTerms = () => useQuery(queryOptions.terms)

const useProfile = (id: number) =>
  useQuery({
    ...queryOptions.profile,
    queryKey: ['profile', id],
    queryFn: () => queryOptions.profile.queryFn(id),
  })

const useUserInfo = () => useQuery(queryOptions.userInfo)

const usePatchProfile = () => {
  const mutationFn = (profile: any): Promise<void> =>
    queryOptions.patchProfile.mutationFn(profile)

  const options: UseMutationOptions<void, Error, any, unknown> = {
    mutationFn,
  }
  return useMutation<void, Error, any>(options)
}

const usePostProfileImg = () => {
  const mutationFn = async (profileImg: FormData): Promise<string> => {
    const response = await queryOptions.postProfileImg.mutationFn(profileImg)
    console.log(response)
    return response
  }

  const options: UseMutationOptions<string, Error, FormData, unknown> = {
    mutationFn,
  }
  return useMutation<string, Error, FormData>(options)
}

const useDeleteProfileImg = () => {
  const mutationFn = (): Promise<void> =>
    queryOptions.deleteProfileImg.mutationFn()

  const options: UseMutationOptions<void, Error, void, unknown> = {
    mutationFn,
  }
  return useMutation<void, Error, void>(options)
}

export {
  useProfile,
  useTerms,
  useUserInfo,
  usePatchProfile,
  usePostProfileImg,
  useDeleteProfileImg,
}
