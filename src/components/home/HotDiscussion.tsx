'use client'

import { HotDiscussionI } from '@/model/Home'
import Image from 'next/image'
import { DiscussionOptionI } from '@/model/Discussion'
import Profile from '../common/Profile'
import Container from '../common/Container'
import DiscussionOption from '../discussion/DiscussionOption'

export interface HotDiscussionProps {
  hotDiscussion: HotDiscussionI
}

const HotDiscussion = ({ hotDiscussion }: HotDiscussionProps) => {
  const {
    id,
    title,
    content,
    participantCount,
    commentCount,
    createdAt,
    memberSimpleInfo,
    options,
  } = hotDiscussion

  return (
    <Container color="purple">
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
                  discussionOption={option}
                  size="small"
                  boardId={id}
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
    </Container>
  )
}

export default HotDiscussion
