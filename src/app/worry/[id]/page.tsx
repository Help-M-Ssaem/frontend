'use client'

import Button from '@/components/common/Button'
import Container from '@/components/common/Container'
import { useParams, useRouter } from 'next/navigation'
import { useDeleteWorry, useWorryDetail } from '@/service/worry/useWorryService'
import WorryProfile from '@/components/worry/WorryProfile'
import { useUserInfo } from '@/service/user/useUserService'
import { useToast } from '@/hooks/useToast'

const WorryDetail = () => {
  const { id } = useParams()
  const worryId = Number(id)
  const router = useRouter()
  const { showToast } = useToast()

  const { data: worryDetail } = useWorryDetail(Number(id))
  const { data: userInfo } = useUserInfo()

  const formattedCreatedAt = worryDetail?.createdAt.split(' ')[0]

  const handleChattingStartClick = () => {
    if (userInfo?.id === worryDetail?.memberSimpleInfo.id) {
      showToast('본인이 작성한 글입니다.')
    } else if (
      userInfo &&
      userInfo.mbti.toUpperCase() === worryDetail?.targetMbti
    ) {
      showToast('채팅을 시작합니다.')
    } else {
      showToast('MBTI가 달라요')
    }
  }

  const { mutate } = useDeleteWorry()
  const handleDeleteClick = () => {
    mutate(worryId)
    router.push('/worry?waitingPage=1&solvedPage=1')
  }

  return (
    <>
      <div className="text-title3 text-maindark font-semibold my-5">
        M쌤 매칭을 기다리는 고민
      </div>
      <Container color="purple">
        {worryDetail && worryDetail.isEditAllowed && (
          <div className="flex justify-end gap-2.5">
            <Button
              text="수정"
              color="PURPLE"
              size="small"
              onClick={() => {
                router.push(`/worry/${id}/update`)
              }}
            />
            <Button
              text="삭제"
              color="PURPLE"
              size="small"
              onClick={handleDeleteClick}
            />
          </div>
        )}

        <div className="h-[1px] bg-main my-5" />
        {worryDetail && (
          <>
            <div className="flex justify-between mb-7.5">
              <WorryProfile
                userId={worryDetail.memberSimpleInfo.id}
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
        <div className="h-[1px] bg-main my-5" />
        <div className="flex justify-center">
          <Button
            text="채팅 시작"
            color="PURPLE"
            size="small"
            onClick={handleChattingStartClick}
          />
        </div>
      </Container>
    </>
  )
}

export default WorryDetail
