'use client'

import { useHotDiscussion } from '@/service/home/useHomeService'
import HotDiscussion from './HotDiscussion'

const HotDiscussionBox = () => {
  const { data: hotDiscussion } = useHotDiscussion()

  return (
    <>
      <div className="text-title3 text-maindark font-bold my-5">HOT 토론글</div>
      <div className="flex flex-wrap justify-center gap-7.5 md:grid md:grid-cols-1 lg:grid lg:grid-cols-2">
        {hotDiscussion && (
          <>
            {hotDiscussion.map((board) => (
              <HotDiscussion hotDiscussion={board} key={board.title} />
            ))}
          </>
        )}
      </div>
    </>
  )
}

export default HotDiscussionBox
