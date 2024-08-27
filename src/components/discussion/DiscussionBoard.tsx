'use client'

import { useEffect, useState } from 'react'
import { DiscussionBoardI, DiscussionOptionI } from '@/model/Discussion'
import Image from 'next/image'
import { usePostDiscussionPraticipation } from '@/service/discussion/useDiscussionService'
import Profile from '../user/Profile'
import DiscussionOption from './DiscussionOption'

export interface DiscussionBoardProps {
  discussionBoard: DiscussionBoardI
}

const DiscussionBoard = ({ discussionBoard }: DiscussionBoardProps) => {
  const {
    id,
    title,
    content,
    createdAt,
    participantCount,
    commentCount,
    memberSimpleInfo,
    options: initialOptions,
  } = discussionBoard

  const [options, setOptions] = useState<DiscussionOptionI[]>(initialOptions)
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null)
  const [selectedOptionPercent, setSelectedOptionPercent] = useState('')

  const { mutate: postDiscussionPraticipation } =
    usePostDiscussionPraticipation()

  const handleOptionClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    optionId: number,
  ) => {
    event.stopPropagation()

    postDiscussionPraticipation(
      {
        discussionId: id,
        discussionOptionId: optionId,
      },
      {
        onSuccess: (data) => {
          const updatedOptions = data.map((option: DiscussionOptionI) => {
            if (option.id === optionId) {
              return { ...option, selected: true }
            } else {
              return { ...option, selected: false }
            }
          })

          setOptions(updatedOptions)

          const selectedOption = updatedOptions.find(
            (option) => option.selected,
          )
          setSelectedOptionId(optionId)
          if (selectedOption) {
            setSelectedOptionPercent(selectedOption.selectedPercent)
          }
        },
      },
    )
  }

  useEffect(() => {
    const selectedOption = options.find(
      (option: DiscussionOptionI) => option.selected,
    )
    if (selectedOption) {
      setSelectedOptionId(selectedOption.id)
      setSelectedOptionPercent(selectedOption.selectedPercent)
    }
  }, [options])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col justify-between gap-5">
        <div className="flex justify-between">
          <Profile user={memberSimpleInfo} />
          <div className="text-caption text-gray2">{createdAt}</div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-title3 font-bold text-maindark">{title}</p>
          <p className="text-body text-maindark">{content}</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          {options &&
            options.map((option: DiscussionOptionI) => (
              <DiscussionOption
                key={option.id}
                discussionOption={option}
                size="small"
                disabled={selectedOptionId !== null}
                selectedPercent={selectedOptionPercent}
                handleOptionClick={(event) =>
                  handleOptionClick(event, option.id)
                }
              />
            ))}
        </div>

        <div className="flex justify-between">
          <div className="flex gap-1">
            <Image
              src="/images/discussion/red_circle.svg"
              alt="red"
              width={12}
              height={12}
            />
            <p className="text-caption text-gray2">
              {participantCount}명이 참여 중!
            </p>
          </div>
          <p className="text-caption text-gray2">댓글 {commentCount}</p>
        </div>
      </div>
    </div>
  )
}

export default DiscussionBoard
