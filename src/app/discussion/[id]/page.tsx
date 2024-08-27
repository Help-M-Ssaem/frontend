'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Button from '@/components/common/Button'
import Container from '@/components/common/Container'
import Profile from '@/components/user/Profile'
import {
  useDeleteDiscussion,
  useDiscussionDetail,
  usePostDiscussionPraticipation,
} from '@/service/discussion/useDiscussionService'
import { useParams, useRouter } from 'next/navigation'
import CommentList from '@/components/board/CommentList'
import { DiscussionOptionI } from '@/model/Discussion'
import DiscussionOption from '@/components/discussion/DiscussionOption'
import { useUserInfo } from '@/service/user/useUserService'
import { queryKeys } from '@/service/discussion/DiscussionQueries'
import { useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/hooks/useToast'

const DiscussionDetail = () => {
  const { id } = useParams()
  const discussionId = Number(id)
  const { data: discussionDetail } = useDiscussionDetail(discussionId)
  const { data: userInfo } = useUserInfo()
  const queryClient = useQueryClient()
  const router = useRouter()
  const { showToast } = useToast()

  const { mutate: postDiscussionPraticipation } =
    usePostDiscussionPraticipation()

  const discussion = discussionDetail && discussionDetail.discussionSimpleInfo

  const [commentCount, setCommentCount] = useState(0)
  const [options, setOptions] = useState<DiscussionOptionI[]>(
    discussion?.options || [],
  )
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null)

  const handleCommentCountUpdate = (newCount: number) => {
    setCommentCount(newCount)
  }

  const { mutate: deleteDiscussion } = useDeleteDiscussion()
  const handleDeleteDiscussion = () => {
    deleteDiscussion(discussionId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queryKeys.discussionList })
        router.back()
      },
      onError: () => {
        showToast('참여중인 토론은 삭제할 수 없습니다')
      },
    })
  }

  const handleOptionClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    optionId: number,
  ) => {
    event.stopPropagation()

    postDiscussionPraticipation(
      {
        discussionId,
        discussionOptionId: optionId,
      },
      {
        onSuccess: (data) => {
          const updatedOptions = data.map((option: DiscussionOptionI) => ({
            ...option,
            selected: option.id === optionId,
          }))

          setOptions(updatedOptions)
          setSelectedOptionId(optionId)
        },
      },
    )
  }

  useEffect(() => {
    if (discussion) {
      const selectedOption = discussion.options.find(
        (option) => option.selected,
      )
      if (selectedOption) {
        setSelectedOptionId(selectedOption.id)
      }
      setOptions(discussion.options)
      setCommentCount(discussion.commentCount)
    }
  }, [discussion])

  return (
    <>
      <div className="text-title3 text-maindark font-semibold my-5">
        MBTI 과몰입 토론
      </div>
      <Container color="purple">
        {userInfo &&
          discussion &&
          userInfo.id === discussion.memberSimpleInfo.id && (
            <>
              <div className="flex justify-end gap-2.5 mb-5">
                <Button
                  text="삭제"
                  color="PURPLE"
                  size="small"
                  onClick={handleDeleteDiscussion}
                />
              </div>
              <div className="h-[1px] bg-main" />
            </>
          )}
        {discussion && (
          <>
            <div className="flex justify-between my-7.5">
              <Profile user={discussion.memberSimpleInfo} />
              <div className="flex gap-3.5 text-caption text-gray2">
                <p>{discussion.createdAt}</p>
              </div>
            </div>

            <div className="flex flex-col gap-9">
              <div className="flex flex-col gap-1">
                <p className="text-title3 font-bold">{discussion.title}</p>
                <div className="text-body text-mainblack">
                  {discussion.content}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {options.map((option: DiscussionOptionI) => (
                  <DiscussionOption
                    key={option.id}
                    discussionOption={option}
                    size="small"
                    disabled={selectedOptionId !== null}
                    selectedPercent={option.selectedPercent}
                    handleOptionClick={(event) =>
                      handleOptionClick(event, option.id)
                    }
                  />
                ))}
              </div>

              <div className="flex justify-between mb-10">
                <div className="flex gap-1">
                  <Image
                    src="/images/discussion/red_circle.svg"
                    alt="red"
                    width={12}
                    height={12}
                  />
                  <p className="text-caption text-gray2">
                    {discussion.participantCount}명이 참여 중!
                  </p>
                </div>
                <p className="text-caption text-gray2">댓글 {commentCount}</p>
              </div>
            </div>
          </>
        )}
        <CommentList
          id={Number(id)}
          page={0}
          size={50}
          commentCount={commentCount}
          onCommentCountUpdate={handleCommentCountUpdate}
          boardType="discussion"
        />
      </Container>
    </>
  )
}

export default DiscussionDetail
