import { useBoardListMember } from '@/service/board/useBoardService'
import {
  useSolvedWorryListMember,
  useWaitingWorryListMember,
} from '@/service/worry/useWorryService'
import { useDiscussionListMember } from '@/service/discussion/useDiscussionService'
import { useCommentListMember } from '@/service/comment/useCommentService'
import { useState } from 'react'
import { DiscussionBoardI } from '@/model/Discussion'
import { WorryI } from '@/model/Worry'
import { BoardI } from '@/model/Board'
import { CommentI } from '@/model/Comment'
import Comment from '../board/Comment'
import Board from '../board/Board'
import DiscussionBoard from '../discussion/DiscussionBoard'
import WorryBoard from '../worry/WorryBoard'

const TABS = [
  '내가 쓴 게시글',
  '내가 쓴 토론글',
  '내가 쓴 고민글',
  '내가 쓴 댓글',
  '내가 해결한 고민',
]

interface MemberListCountProps {
  id: number
}

const MemberListCount = ({ id }: MemberListCountProps) => {
  const [activeTab, setActiveTab] = useState(TABS[0])

  const { data: boardList } = useBoardListMember(id, 0, 5)
  const { data: discussionList } = useDiscussionListMember(id, 0, 5)
  const { data: solvedWorryList } = useSolvedWorryListMember(id, 0, 5)
  const { data: waitingWorryList } = useWaitingWorryListMember(id, 0, 5)
  const { data: commentList } = useCommentListMember(id, 0, 4)

  const renderList = () => {
    switch (activeTab) {
      case '내가 쓴 게시글':
        return (
          boardList &&
          boardList.result.map((item: BoardI, index: number) => (
            <Board key={index} board={item} />
          ))
        )
      case '내가 쓴 토론글':
        return (
          discussionList &&
          discussionList.result.map((item: DiscussionBoardI, index: number) => (
            <DiscussionBoard key={index} discussionBoard={item} />
          ))
        )
      case '내가 쓴 고민글':
        return (
          waitingWorryList &&
          waitingWorryList.result.map((item: WorryI, index: number) => (
            <WorryBoard key={index} worryBoard={item} />
          ))
        )
      case '내가 해결한 고민':
        return (
          solvedWorryList &&
          solvedWorryList.result.map((item: WorryI, index: number) => (
            <WorryBoard key={index} worryBoard={item} />
          ))
        )
      case '내가 쓴 댓글':
        return (
          commentList &&
          commentList.result.map((item: CommentI, index: number) => (
            <Comment key={index} comment={item} />
          ))
        )
      default:
        return null
    }
  }

  return (
    <div className="w-full bg-main3 rounded-t-7.5">
      <div className="flex overflow-x-auto border-b mb-4 scrollbar-hide">
        {TABS.map((tab) => (
          <button
            type="button"
            key={tab}
            className={`flex-grow py-6 px-4 text-title3 font-semibold focus:outline-none whitespace-nowrap ${
              activeTab === tab
                ? 'border-b-2 border-main text-main2'
                : 'text-gray-500 hover:text-main2'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="px-7.5 pb-7.5 rounded-7.5">{renderList()}</div>
    </div>
  )
}

export default MemberListCount
