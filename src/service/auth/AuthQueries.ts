import { Signup } from '@/model/User'
import AuthService from './AuthService'

const queryKeys = {
  auth: 'auth',
}

const queryOptions = {
  postSignup: {
    queryKey: queryKeys.auth,
    mutationFn: async (auth: Signup): Promise<void> => {
      await AuthService.postSignup(auth)
    },
  },

  postNicknameDuplicationCheck: {
    queryKey: queryKeys.auth,
    mutationFn: async (nickName: string): Promise<void> => {
      await AuthService.postNicknameDuplicationCheck(nickName)
    },
  },
}

export { queryKeys, queryOptions }
