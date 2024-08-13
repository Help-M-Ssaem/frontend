'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import MbtiCategories from '@/components/board/MbtiCategories'
import Button from '@/components/common/Button'
import Container from '@/components/common/Container'
import Profile from '@/components/common/Profile'
import {
  useBoardDetail,
  usePostBoardLike,
} from '@/service/board/useBoardService'
import { useParams } from 'next/navigation'
import CommentList from '@/components/board/CommentList'

const BoardDetail = () => {
  const { id } = useParams()
  const { data: boardDetail } = useBoardDetail(Number(id))
  const { mutate } = usePostBoardLike()

  const [currentPage] = useState(1)
  const pageSize = 50

  const [likeCount, setLikeCount] = useState(boardDetail?.likeCount || 0)
  const [isLiked, setIsLiked] = useState(boardDetail?.isLiked || false)

  useEffect(() => {
    if (boardDetail) {
      setLikeCount(boardDetail.likeCount)
      setIsLiked(boardDetail.isLiked)
    }
  }, [boardDetail])

  const handleLikeToggle = () => {
    mutate(Number(id), {
      onSuccess: () => {
        setIsLiked(!isLiked)
        setLikeCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1))
      },
    })
  }

  return (
    <div>
      {boardDetail && (
        <>
          <MbtiCategories selectedMbti={boardDetail.boardMbti} />
          <div className="text-title3 text-maindark font-semibold my-5">
            {boardDetail.boardMbti === 'all' ? '전체' : boardDetail.boardMbti}
            게시판
          </div>
          <Container color="purple">
            <div className="flex justify-end gap-2.5 mb-5">
              <Button
                text="수정"
                color="PURPLE"
                size="small"
                onClick={() => {}}
              />
              <Button
                text="삭제"
                color="PURPLE"
                size="small"
                onClick={() => {}}
              />
            </div>
            <div className="h-[1px] bg-main" />

            <div className="flex justify-between my-7.5">
              <Profile user={boardDetail.memberSimpleInfo} />
              <div className="flex gap-3.5 text-caption text-gray2">
                <p>조회수 {boardDetail.hits}회</p> |{' '}
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
                className="cursor-pointer my-10"
                onClick={handleLikeToggle}
              />
            </div>
            <CommentList
              id={Number(id)}
              page={currentPage - 1}
              size={pageSize}
            />
          </Container>
        </>
      )}
    </div>
  )
}

export default BoardDetail
