'use client'

import { useState } from 'react'
import { DiscussionBoardI, DiscussionOptionI } from '@/model/Discussion'
import Image from 'next/image'
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
    options,
  } = discussionBoard

  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null)

  const formattedCreatedAt = createdAt.split(' ')[0]

  const handleOptionSelect = (optionId: number) => {
    setSelectedOptionId(optionId)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col justify-between gap-5">
        <div className="flex justify-between">
          <Profile user={memberSimpleInfo} />
          <div className="text-caption text-gray2">{formattedCreatedAt}</div>
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
                boardId={id}
                onSelect={handleOptionSelect}
                disabled={
                  selectedOptionId !== null && selectedOptionId !== option.id
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
