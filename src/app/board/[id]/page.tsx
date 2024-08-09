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
import CommentList from '@/components/board/CommentList'

const BoardDetail = () => {
  const { id } = useParams()
  const { data: boardDetail } = useBoardDetail(Number(id))
  const { mutate } = usePostBoardLike()

  const handleLikeToggle = () => {
    mutate(Number(id))
  }

  return (
    <>
      {boardDetail && (
        <>
          <MbtiCategories selectedMbti={boardDetail.boardMbti} />
          <div className="text-title3 text-maindark font-semibold my-5">
            {boardDetail.boardMbti === 'all' ? '전체' : boardDetail.boardMbti}{' '}
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

            <div className="flex justify-center items-center gap-7.5">
              <div className="text-main2 text-title1 font-semibold">
                {boardDetail.likeCount}
              </div>
              <Image
                src={`/images/board/${boardDetail.isLiked ? 'like_fill' : 'like_empty'}.svg`}
                width={90}
                height={90}
                alt="like_btn"
                className="cursor-pointer my-10"
                onClick={handleLikeToggle}
              />
            </div>
          </Container>
        </>
      )}

      <Container color="purple">
        <CommentList id={Number(id)} page={0} size={10} />
      </Container>
    </>
  )
}

export default BoardDetail
