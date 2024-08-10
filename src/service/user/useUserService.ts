import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from '@tanstack/react-query'
import { Profile } from '@/model/User'
import queryOptions from './UserQueries'

const useProfile = (id: number) =>
  useQuery({
    ...queryOptions.profile,
    queryKey: ['profile', id],
    queryFn: () => queryOptions.profile.queryFn(id),
  })

const useUserInfo = () => useQuery(queryOptions.userInfo)

const usePatchProfile = () => {
  const mutationFn = (profile: Profile): Promise<void> =>
    queryOptions.patchProfile.mutationFn(profile)

  const options: UseMutationOptions<void, Error, Profile, unknown> = {
    mutationFn,
  }
  return useMutation<void, Error, Profile>(options)
}

const usePostProfileImg = () => {
  const mutationFn = (profileImg: FormData): Promise<void> =>
    queryOptions.postProfileImg.mutationFn(profileImg)

  const options: UseMutationOptions<void, Error, FormData, unknown> = {
    mutationFn,
  }
  return useMutation<void, Error, FormData>(options)
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
  useUserInfo,
  usePatchProfile,
  usePostProfileImg,
  useDeleteProfileImg,
}
