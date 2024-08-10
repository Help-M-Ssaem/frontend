import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { Signup } from '@/model/User'
import { queryOptions } from './AuthQueries'

const usePostSignup = () => {
  const mutationFn = (auth: Signup): Promise<void> =>
    queryOptions.postSignup.mutationFn(auth)

  const options: UseMutationOptions<void, Error, Signup, unknown> = {
    mutationFn,
  }
  return useMutation<void, Error, Signup>(options)
}

const usePostNicknameDuplicationCheck = () => {
  const mutationFn = (nickName: string): Promise<void> =>
    queryOptions.postNicknameDuplicationCheck.mutationFn(nickName)

  const options: UseMutationOptions<void, Error, string, unknown> = {
    mutationFn,
  }
  return useMutation<void, Error, string>(options)
}

export { usePostSignup, usePostNicknameDuplicationCheck }
