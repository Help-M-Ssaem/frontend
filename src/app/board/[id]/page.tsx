'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import MbtiCategories from '@/components/board/MbtiCategories'
import Button from '@/components/common/Button'
import Container from '@/components/common/Container'
import Profile from '@/components/user/Profile'
import {
  useBoardDetail,
  useDeleteBoard,
  usePostBoardLike,
} from '@/service/board/useBoardService'
import { useParams, useRouter } from 'next/navigation'
import CommentList from '@/components/board/CommentList'
import { useUserInfo } from '@/service/user/useUserService'
import { useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/service/board/BoardQueries'
import { useToast } from '@/hooks/useToast'

const BoardDetail = () => {
  const { id } = useParams()
  const boardId = Number(id)
  const router = useRouter()

  const queryClient = useQueryClient()

  const { showToast } = useToast()

  const { data: userInfo } = useUserInfo()
  const { data: boardDetail } = useBoardDetail(boardId)
  const { mutate: postBoardLike } = usePostBoardLike()
  const { mutate: deleteBoard } = useDeleteBoard()

  const [likeCount, setLikeCount] = useState(boardDetail?.likeCount || 0)
  const [isLiked, setIsLiked] = useState(boardDetail?.isLiked || false)
  const [commentCount, setCommentCount] = useState(
    (boardDetail && boardDetail.commentCount) || 0,
  )

  useEffect(() => {
    if (boardDetail) {
      setLikeCount(boardDetail.likeCount)
      setIsLiked(boardDetail.isLiked)
      setCommentCount(boardDetail.commentCount)
    }
  }, [boardDetail])

  const handleLikeToggle = () => {
    if (!userInfo) {
      showToast('로그인이 필요한 서비스입니다')
      return
    }
    if (userInfo && userInfo.id === boardDetail?.memberSimpleInfo.id) {
      showToast('본인 게시글에는 좋아요를 누를 수 없습니다')
      return
    }
    postBoardLike(boardId, {
      onSuccess: () => {
        showToast(isLiked ? '공감을 취소하였습니다' : '공감을 눌렀습니다')
        setIsLiked(!isLiked)
        setLikeCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1))
      },
    })
  }

  const handleCommentCountUpdate = (newCount: number) => {
    setCommentCount(newCount)
  }

  const handleDelete = () => {
    deleteBoard(boardId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queryKeys.boardList })
        showToast('게시글이 삭제되었습니다')
        router.back()
      },
    })
  }

  return (
    <div>
      {boardDetail && (
        <>
          <MbtiCategories selectedMbti={boardDetail.boardMbti} />
          <div className="text-title3 text-maindark font-semibold my-5">
            {boardDetail.boardMbti === 'all' ? '전체' : boardDetail.boardMbti}{' '}
            게시판
          </div>
          <Container color="purple">
            {userInfo && userInfo.id === boardDetail.memberSimpleInfo.id && (
              <>
                <div className="flex justify-end gap-2.5 mb-5">
                  <Button
                    text="수정"
                    color="LIGHTPURPLE"
                    size="small"
                    onClick={() => {
                      router.push(`/board/${id}/update`)
                    }}
                  />
                  <Button
                    text="삭제"
                    color="PURPLE"
                    size="small"
                    onClick={handleDelete}
                  />
                </div>
                <div className="h-[1px] bg-main" />
              </>
            )}

            <div className="flex justify-between my-7.5">
              <Profile user={boardDetail.memberSimpleInfo} />
              <div className="flex text-caption text-gray2 items-end justify-end flex-col-reverse gap-1 sm:gap-3.5 sm:flex-row sm:items-start">
                <p>조회수 {boardDetail.hits}회</p>
                <p className="hidden sm:inline">|</p>
                <p>{boardDetail.createdAt}</p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-title3 font-bold text-maindark">
                {boardDetail.title}
              </p>
              <div
                className="text-body text-maindark"
                dangerouslySetInnerHTML={{ __html: boardDetail.content }}
              />
            </div>

            <div className="flex justify-center items-center gap-2 sm:gap-6 my-4">
              <div className="text-main2 text-body sm:text-title2 font-semibold">
                {likeCount}
              </div>
              <div className="w-12 h-12 sm:w-20 sm:h-20 relative overflow-hidden">
                <Image
                  src={`/images/board/${isLiked ? 'like_fill' : 'like_empty'}.svg`}
                  alt="like_btn"
                  className="object-cover cursor-pointer"
                  fill
                  onClick={handleLikeToggle}
                />
              </div>
            </div>

            <CommentList
              id={boardId}
              page={0}
              size={50}
              commentCount={commentCount}
              onCommentCountUpdate={handleCommentCountUpdate}
            />
          </Container>
        </>
      )}
    </div>
  )
}

export default BoardDetail
