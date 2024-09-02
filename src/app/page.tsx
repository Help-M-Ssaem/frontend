import HotThreeBox from '@/components/home/HotThreeBox'
import HotBoardBox from '@/components/home/HotBoardBox'
import HotDiscussionBox from '@/components/home/HotDiscussionBox'

export default async function HomePage() {
  return (
    <>
      <HotThreeBox />
      <HotBoardBox />
      <HotDiscussionBox />
    </>
  )
}
