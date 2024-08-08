import WorryService, { WorryListProps, WorryPatchProps } from './WorryService'

const queryKeys = {
  worry: (worryId: number) => ['worry', worryId] as const,
  worryList: ['worryList'] as const,
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
}

export { queryKeys, queryOptions }
