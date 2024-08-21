import UserService from './UserService'

const queryKeys = {
  user: ['user'] as const,
  terms: ['terms'] as const,
  profile: (id: number) => ['profile', id] as const,
  profileImg: ['profileImg'] as const,
}

const queryOptions = {
  terms: {
    queryKey: queryKeys.terms,
    queryFn: async () => {
      const res = await UserService.getTerms()
      return res.data
    },
  },

  profile: {
    queryKey: (id: number) => queryKeys.profile(id),
    queryFn: async (id: number) => {
      const res = await UserService.getProfile(id)
      return res.data
    },
  },

  userInfo: {
    queryKey: queryKeys.user,
    queryFn: async () => {
      const res = await UserService.getUserInfo()
      return res.data
    },
  },

  patchProfile: {
    queryKey: (boardId: number) => queryKeys.profile(boardId),
    mutationFn: async (profile: any): Promise<void> => {
      await UserService.patchProfile(profile)
    },
  },

  postProfileImg: {
    queryKey: queryKeys.profileImg,
    mutationFn: async (profileImg: FormData): Promise<any> => {
      const response = await UserService.postProfileImg(profileImg)
      return response
    },
  },

  deleteProfileImg: {
    queryKey: queryKeys.profileImg,
    mutationFn: async (): Promise<void> => {
      await UserService.deleteProfileImg()
    },
  },
}

export default queryOptions
