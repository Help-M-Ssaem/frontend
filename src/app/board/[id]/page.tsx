'use client'

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
import { useState } from 'react'
import CommentList from '@/components/board/CommentList'

const BoardDetail = () => {
  const [mbti, setMbti] = useState<string>('all')
  const { id } = useParams()
  const { data } = useBoardDetail(Number(id))
  const { mutate } = usePostBoardLike()

  const handleLikeToggle = () => {
    mutate(Number(id))
  }

  return (
    <>
      <MbtiCategories selectedMbti={mbti} setMbti={setMbti} />
      <div className="text-title3 text-maindark font-semibold my-5">
        {mbti === 'all' ? '전체' : mbti} 게시판
      </div>
      <Container color="purple">
        <div className="flex justify-end gap-2.5 mb-5">
          <Button text="수정" color="PURPLE" size="small" onClick={() => {}} />
          <Button text="삭제" color="PURPLE" size="small" onClick={() => {}} />
        </div>
        <div className="h-[1px] bg-main" />
        {data && (
          <>
            <div className="flex justify-between my-7.5">
              <Profile user={data?.memberSimpleInfo} />
              <div className="flex gap-3.5 text-caption text-gray2">
                <p>조회수 {data.hits}회</p> | <p>{data.createdAt}</p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-title3 font-bold">{data.title}</p>
              <div
                className="text-body text-mainblack"
                dangerouslySetInnerHTML={{ __html: data.content }}
              />
            </div>

            <div className="flex justify-center items-center gap-7.5">
              <div className="text-main2 text-title1 font-semibold">
                {data.likeCount}
              </div>
              <Image
                src={`/images/board/${data.isLiked ? 'like_fill' : 'like_empty'}.svg`}
                width={90}
                height={90}
                alt="like_btn"
                className="cursor-pointer my-10"
                onClick={handleLikeToggle}
              />
            </div>
          </>
        )}

        <CommentList id={Number(id)} page={0} size={10} />
      </Container>
    </>
  )
}

export default BoardDetail
