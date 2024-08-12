'use client'

import Image from 'next/image'
import Button from '@/components/common/Button'
import Container from '@/components/common/Container'
import Profile from '@/components/common/Profile'
import { useDiscussionDetail } from '@/service/discussion/useDiscussionService'
import { useParams } from 'next/navigation'
import CommentList from '@/components/board/CommentList'
import { DiscussionOptionI } from '@/model/Discussion'
import DiscussionOption from '@/components/discussion/DiscussionOption'

const DiscussionDetail = () => {
  const { id } = useParams()
  const { data: discussionDetail } = useDiscussionDetail(Number(id))

  const discussion = discussionDetail && discussionDetail.discussionSimpleInfo
  const formattedCreatedAt = discussion && discussion.createdAt.split(' ')[0]

  return (
    <>
      <div className="text-title3 text-maindark font-semibold my-5">
        MBTI 과몰입 토론
      </div>
      <Container color="purple">
        <div className="flex justify-end gap-2.5 mb-5">
          <Button text="수정" color="PURPLE" size="small" onClick={() => {}} />
          <Button text="삭제" color="PURPLE" size="small" onClick={() => {}} />
        </div>
        <div className="h-[1px] bg-main" />
        {discussion && (
          <>
            <div className="flex justify-between my-7.5">
              <Profile user={discussion?.memberSimpleInfo} />
              <div className="flex gap-3.5 text-caption text-gray2">
                <p>{formattedCreatedAt}</p>
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
                {discussion.options &&
                  discussion.options.map((option: DiscussionOptionI) => (
                    <DiscussionOption
                      discussionOption={option}
                      size="small"
                      boardId={Number(id)}
                      onSelect={() => {}}
                      disabled={false}
                    />
                  ))}
              </div>

              <div className="flex justify-between mb-7.5">
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
                <p className="text-caption text-gray2">
                  댓글 {discussion.commentCount}
                </p>
              </div>
            </div>
          </>
        )}
        <CommentList id={Number(id)} page={0} size={10} board="discussion" />
      </Container>
    </>
  )
}

export default DiscussionDetail
