import WorryService, {
  WorryListMemberProps,
  WorryListProps,
  WorryPatchProps,
} from './WorryService'

const queryKeys = {
  worry: (worryId: number) => ['worry', worryId] as const,
  worryList: ['worryList'] as const,
  worryListImage: ['worryListImage'] as const,
}

const queryOptions = {
  waitingWorryList: {
    queryFn: async ({ page, size, strFromMbti, strToMbti }: WorryListProps) => {
      const res = await WorryService.getWaitingWorryList({
        page,
        size,
        strFromMbti,
        strToMbti,
      })
      return res.data
    },
  },

  waitingWorryListMember: {
    queryFn: async ({ memberId, page, size }: WorryListMemberProps) => {
      const res = await WorryService.getWaitingWorryListMember({
        memberId,
        page,
        size,
      })
      return res.data
    },
  },

  solvedWorryList: {
    queryFn: async ({ page, size, strFromMbti, strToMbti }: WorryListProps) => {
      const res = await WorryService.getSolvedWorryList({
        page,
        size,
        strFromMbti,
        strToMbti,
      })
      return res.data
    },
  },

  solvedWorryListMember: {
    queryFn: async ({ memberId, page, size }: WorryListMemberProps) => {
      const res = await WorryService.getSolvedWorryListMember({
        memberId,
        page,
        size,
      })
      return res.data
    },
  },

  worryDetail: {
    queryFn: async (worryId: number) => {
      const res = await WorryService.getWorryDetail(worryId)
      return res.data
    },
  },

  postWorry: {
    mutationFn: async (worry: FormData): Promise<void> => {
      await WorryService.postWorry(worry)
    },
  },

  postWorryImage: {
    queryKey: queryKeys.worryListImage,
    mutationFn: async (WorryImage: FormData): Promise<any> => {
      const response = await WorryService.postWorryImage(WorryImage)
      return response
    },
  },

  patchWorry: {
    mutationFn: async ({ id, worry }: WorryPatchProps): Promise<void> => {
      await WorryService.patchWorry({ id, worry })
    },
  },

  deleteWorry: {
    mutationFn: async (id: number): Promise<void> => {
      await WorryService.deleteWorry(id)
    },
  },

  patchWorrySolved: {
    mutationFn: async (worryId: number): Promise<void> => {
      await WorryService.patchWorrySolved(worryId)
    },
  },

  postChattingRoom: {
    mutationFn: async ({
      worryBoardId,
    }: {
      worryBoardId: number
    }): Promise<number> => {
      const response = await WorryService.postChattingRoom({ worryBoardId })
      return response.data
    },
  },
}

export { queryKeys, queryOptions }
