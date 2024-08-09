'use client'

import Button from '@/components/common/Button'
import Container from '@/components/common/Container'
import { useParams } from 'next/navigation'
import { useWorryDetail } from '@/service/worry/useWorryService'
import WorryProfile from '@/components/worry/WorryProfile'

const WorryDetail = () => {
  const { id } = useParams()
  const { data: worryDetail } = useWorryDetail(Number(id))

  const formattedCreatedAt = worryDetail?.createdAt.split(' ')[0]

  return (
    <>
      <div className="text-title3 text-maindark font-semibold my-5">
        M쌤 매칭을 기다리는 고민
      </div>
      <Container color="purple">
        <div className="flex justify-end gap-2.5 mb-5">
          <Button text="수정" color="PURPLE" size="small" onClick={() => {}} />
          <Button text="삭제" color="PURPLE" size="small" onClick={() => {}} />
        </div>
        <div className="h-[1px] bg-main" />
        {worryDetail && (
          <>
            <div className="flex justify-between my-7.5">
              <WorryProfile
                profileImgUrl={worryDetail.memberSimpleInfo.profileImgUrl}
                nickName={worryDetail.memberSimpleInfo.nickName}
                strFromMbti={worryDetail.memberSimpleInfo.mbti}
                strToMbti={worryDetail.targetMbti}
              />
              <div className="flex flex-col items-end gap-1 sm:flex-row sm:gap-3.5 sm:items-start text-caption text-gray2">
                <p>조회수 {worryDetail.hits}회</p>
                <p>{formattedCreatedAt}</p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-title3 font-bold">{worryDetail.title}</p>
              <div
                className="text-body text-mainblack"
                dangerouslySetInnerHTML={{ __html: worryDetail.content }}
              />
            </div>
          </>
        )}
        <div className="h-[1px] bg-main" />
        <div className="flex justify-center">
          <Button
            text="채팅 시작"
            color="PURPLE"
            size="small"
            onClick={() => {}}
            className="my-10"
          />
        </div>
      </Container>
    </>
  )
}

export default WorryDetail
