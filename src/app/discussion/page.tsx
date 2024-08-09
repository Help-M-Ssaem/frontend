'use client'

import DiscussionBoard from '@/components/discussion/DiscussionBoard'
import { useDiscussionList } from '@/service/discussion/useDiscussionService'

const DiscussionPage = () => {
  const { data: discussionList } = useDiscussionList(0, 10)

  return (
    <>
      <div className="text-title3 text-maindark font-semibold my-5">
        MBTI 과몰입 토론
      </div>
      <div className="flex flex-col gap-2.5 sm:gap-16.5">
        {discussionList &&
          discussionList.result.map((discussion) => (
            <>
              <DiscussionBoard
                key={discussion.id}
                discussionBoard={discussion}
              />
              <div className="h-[1px] bg-gray4" />
            </>
          ))}
      </div>
    </>
  )
}

export default DiscussionPage
