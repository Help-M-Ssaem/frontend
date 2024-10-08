import { useBoardListMember } from '@/service/board/useBoardService'
import {
  useSolvedWorryListMember,
  useWaitingWorryListMember,
} from '@/service/worry/useWorryService'
import { useDiscussionListMember } from '@/service/discussion/useDiscussionService'
import { useCommentListMember } from '@/service/comment/useCommentService'
import { useProfile } from '@/service/user/useUserService'
import { useState, useEffect } from 'react'
import { DiscussionBoardI } from '@/model/Discussion'
import { WorryI } from '@/model/Worry'
import { BoardI } from '@/model/Board'
import { CommentI } from '@/model/Comment'
import Comment from '../board/Comment'
import Board from '../board/Board'
import DiscussionBoard from '../discussion/DiscussionBoard'
import WorryBoard from '../worry/WorryBoard'
import Container from '../common/Container'

interface MemberListCountProps {
  id: number
}

const MemberListCount = ({ id }: MemberListCountProps) => {
  const [activeTab, setActiveTab] = useState('')
  const [tabs, setTabs] = useState<string[]>([])

  const { data: profile } = useProfile(id)

  const { data: boardList } = useBoardListMember(id, 0, 5)
  const { data: discussionList } = useDiscussionListMember(id, 0, 5)
  const { data: solvedWorryList } = useSolvedWorryListMember(id, 0, 5)
  const { data: waitingWorryList } = useWaitingWorryListMember(id, 0, 5)
  const { data: commentList } = useCommentListMember(id, 0, 4)

  useEffect(() => {
    const nickName = profile && profile.teacherInfo.nickName
    const newTabs = [
      `${nickName} 쓴 게시글`,
      `${nickName} 쓴 토론글`,
      `${nickName} 쓴 고민글`,
      `${nickName} 쓴 댓글`,
      `${nickName} 해결한 고민`,
    ]
    setTabs(newTabs)
    setActiveTab(newTabs[0])
  }, [profile])

  const renderList = () => {
    switch (activeTab) {
      case `${profile?.teacherInfo.nickName} 쓴 게시글`:
        return (
          boardList &&
          boardList.result.map((item: BoardI, index: number) => (
            <div key={index}>
              <Board board={item} />
              <div className="h-[1px] bg-main my-7.5" />
            </div>
          ))
        )
      case `${profile?.teacherInfo.nickName} 쓴 토론글`:
        return (
          discussionList &&
          discussionList.result.map((item: DiscussionBoardI, index: number) => (
            <div key={index}>
              <DiscussionBoard discussionBoard={item} />
              <div className="h-[1px] bg-main my-7.5" />
            </div>
          ))
        )
      case `${profile?.teacherInfo.nickName} 쓴 고민글`:
        return (
          waitingWorryList &&
          waitingWorryList.result.map((item: WorryI, index: number) => (
            <div key={index}>
              <WorryBoard worryBoard={item} />
              <div className="h-[1px] bg-main my-7.5" />
            </div>
          ))
        )
      case `${profile?.teacherInfo.nickName} 해결한 고민`:
        return (
          solvedWorryList &&
          solvedWorryList.result.map((item: WorryI, index: number) => (
            <div key={index}>
              <WorryBoard worryBoard={item} />
              <div className="h-[1px] bg-main my-7.5" />
            </div>
          ))
        )
      case `${profile?.teacherInfo.nickName} 쓴 댓글`:
        return (
          commentList &&
          commentList.result.map((item: CommentI, index: number) => (
            <div key={index}>
              <Comment comment={item} />
              <div className="h-[1px] bg-main my-7.5" />
            </div>
          ))
        )
      default:
        return null
    }
  }

  return (
    <div className="w-full bg-main3 rounded-t-7.5">
      <div className="flex overflow-x-auto border-b mb-4 scrollbar-hide">
        {tabs.map((tab) => (
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

      <Container color="purple">{renderList()}</Container>
    </div>
  )
}

export default MemberListCount
