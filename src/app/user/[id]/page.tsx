'use client'

import ActivityCount from '@/components/auth/ActivityCount'
import UserProfile from '@/components/auth/UserProfile'
import Container from '@/components/common/Container'
import { useParams } from 'next/navigation'
import { useProfile } from '@/service/user/useUserService'
import Button from '@/components/common/Button'
import MemberListCount from '@/components/auth/MemberListCount'

const Userpage = () => {
  const { id } = useParams()
  const profileId = Number(id)

  const { data: profileData } = useProfile(Number(profileId))

  if (!profileData) return null

  const activitySections = [
    {
      title: '받은 평가',
      items: [
        { label: '좋아요', count: profileData.evaluationCount.likeCount },
        { label: '유익해요', count: profileData.evaluationCount.usefulCount },
        { label: '재밌어요', count: profileData.evaluationCount.funCount },
        {
          label: '성의있어요',
          count: profileData.evaluationCount.sincereCount,
        },
        { label: '화끈해요', count: profileData.evaluationCount.hotCount },
      ],
    },
    {
      title: '게시판 활동',
      items: [
        { label: '전체 게시글', count: profileData.boardHistory.boardCount },
        {
          label: '전체 댓글',
          count: profileData.boardHistory.boardCommentCount,
        },
        { label: '받은 좋아요', count: profileData.boardHistory.likeAllCount },
      ],
    },
    {
      title: '과몰입토론 활동',
      items: [
        {
          label: '전체 토론글',
          count: profileData.discussionHistory.discussionCount,
        },
        {
          label: '전체 댓글',
          count: profileData.discussionHistory.discussionCommentCount,
        },
        {
          label: '전체 참여자',
          count: profileData.discussionHistory.participationCount,
        },
      ],
    },
    {
      title: 'M쌤 매칭',
      items: [
        {
          label: '전체 고민',
          count: profileData.worryBoardHistory.worryBoardCount,
        },
        {
          label: '전체 해결',
          count: profileData.worryBoardHistory.solvedWorryBoardCount,
        },
        {
          label: '전체 평가',
          count: profileData.worryBoardHistory.evaluationCount,
        },
      ],
    },
  ]

  return (
    <>
      <div className="text-title3 text-maindark font-semibold my-6">
        {profileData.teacherInfo.nickName} 프로필
      </div>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-4 lg:grid-rows-1">
        <Container color="purple" className="md:col-span-1 lg:col-span-1">
          <UserProfile profile={profileData.teacherInfo} />
        </Container>
        <Container color="purple" className="md:col-span-1 lg:col-span-1">
          <div className="text-title3 text-gray1 items-start font-semibold mb-2.5">
            수집한 칭호
          </div>
          <div className="flex flex-wrap gap-2.5 ">
            {profileData.badgeInfos.map((badge, index) => (
              <Button
                key={index}
                text={badge.name}
                color={badge.name}
                size="badge"
              />
            ))}
          </div>
        </Container>
        <Container color="purple" className="md:col-span-2 lg:col-span-2">
          <div className="grid grid-cols-2 gap-6">
            {activitySections.map((section, index) => (
              <ActivityCount
                key={index}
                title={section.title}
                items={section.items}
              />
            ))}
          </div>
        </Container>
      </div>
      <div className="my-6">
        <MemberListCount id={profileId} />
      </div>
    </>
  )
}

export default Userpage
