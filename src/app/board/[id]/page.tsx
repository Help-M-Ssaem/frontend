'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import MbtiCategories from '@/components/board/MbtiCategories'
import Button from '@/components/common/Button'
import Container from '@/components/common/Container'
import Profile from '@/components/common/Profile'
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

const BoardDetail = () => {
  const { id } = useParams()
  const boardId = Number(id)
  const router = useRouter()

  const queryClient = useQueryClient()

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
    if (userInfo && userInfo.id === boardDetail?.memberSimpleInfo.id) {
      return
    }
    postBoardLike(boardId, {
      onSuccess: () => {
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
                    color="PURPLE"
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
              <div className="flex gap-3.5 text-caption text-gray2">
                <p>조회수 {boardDetail.hits}회</p> |
                <p>{boardDetail.createdAt}</p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-title3 font-bold">{boardDetail.title}</p>
              <div
                className="text-body text-mainblack"
                dangerouslySetInnerHTML={{ __html: boardDetail.content }}
              />
            </div>

            <div className="flex justify-center items-center gap-6">
              <div className="text-main2 text-title2 font-semibold">
                {likeCount}
              </div>
              <Image
                src={`/images/board/${isLiked ? 'like_fill' : 'like_empty'}.svg`}
                width={80}
                height={80}
                alt="like_btn"
                className={`my-10 ${
                  userInfo && userInfo.id === boardDetail.memberSimpleInfo.id
                    ? 'cursor-default'
                    : 'cursor-pointer'
                }`}
                onClick={handleLikeToggle}
              />
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
