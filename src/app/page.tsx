import HotThreeBox from '@/components/home/HotThreeBox'
import HotBoardBox from '@/components/home/HotBoardBox'
import HotDiscussionBox from '@/components/home/HotDiscussionBox'
import { fetchUserInfo } from '@/service/user/fetchUserInfo'
import { User } from '@/model/User'

export default async function HomePage() {
  const userInfo: User | null = await fetchUserInfo()

  return (
    <>
      <HotThreeBox userInfo={userInfo} />
      <HotBoardBox />
      <HotDiscussionBox />
    </>
  )
}
