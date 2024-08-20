import BoardService, {
  BoardListFilteredProps,
  BoardListMemberProps,
  BoardListProps,
  BoardPatchProps,
} from './BoardService'

const queryKeys = {
  board: (boardId: number) => ['board', boardId] as const,
  boardList: ['boardList'] as const,
  boardListImage: ['boardListImage'] as const,
  boardListNumber: ['boardListNumber'] as const,
  bookmarkList: ['bookmarkList'] as const,
}

const queryOptions = {
  boardList: {
    queryKey: queryKeys.boardList,
    queryFn: async ({ mbti, page, size }: BoardListProps) => {
      const res = await BoardService.getBoardList({
        mbti,
        page,
        size,
      })
      return res.data
    },
  },

  boardListFiltered: {
    queryKey: (boardId: number) => ['boardListFiltered', boardId] as const,
    queryFn: async ({ boardId, page, size }: BoardListFilteredProps) => {
      const res = await BoardService.getBoardListFiltered({
        boardId,
        page,
        size,
      })
      return res.data
    },
  },

  boardListMember: {
    queryKey: (memberId: number) => ['boardListMember', memberId] as const,
    queryFn: async ({ memberId, page, size }: BoardListMemberProps) => {
      const res = await BoardService.getBoardListMember({
        memberId,
        page,
        size,
      })
      return res.data
    },
  },

  boardListNumber: {
    queryKey: queryKeys.boardListNumber,
    queryFn: async () => {
      const res = await BoardService.getBoardListNumber()
      return res.data
    },
  },

  boardDetail: {
    queryKey: (boardId: number) => queryKeys.board(boardId),
    queryFn: async (boardId: number) => {
      const res = await BoardService.getBoardDetail(boardId)
      return res.data
    },
  },

  categoryBookmark: {
    queryKey: queryKeys.bookmarkList,
    queryFn: async () => {
      const res = await BoardService.getCategoryBookmark()
      return res.data
    },
  },

  postCategoryBookmark: {
    queryKey: queryKeys.bookmarkList,
    mutationFn: async (mbti: string): Promise<void> => {
      await BoardService.postCategoryBookmark(mbti)
    },
  },

  postBoardLike: {
    queryKey: (boardId: number) => queryKeys.board(boardId),
    mutationFn: async (boardId: number): Promise<void> => {
      await BoardService.postBoardLike(boardId)
    },
  },

  postBoard: {
    queryKey: queryKeys.boardList,
    mutationFn: async (board: FormData): Promise<void> => {
      await BoardService.postBoard(board)
    },
  },

  postBoardImage: {
    queryKey: queryKeys.boardListImage,
    mutationFn: async (boardImage: FormData): Promise<any> => {
      const response = await BoardService.postBoardImage(boardImage)
      return response
    },
  },

  patchBoard: {
    queryKey: (boardId: number) => queryKeys.board(boardId),
    mutationFn: async ({ id, board }: BoardPatchProps): Promise<void> => {
      await BoardService.patchBoard({ id, board })
    },
  },

  deleteBoard: {
    queryKey: queryKeys.boardList,
    mutationFn: async (boardId: number): Promise<void> => {
      await BoardService.deleteBoard(boardId)
    },
  },
}

export { queryKeys, queryOptions }
