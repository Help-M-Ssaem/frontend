import HotBoard, { HotBoardProps } from '@/components/home/HotBoard'
import { Meta, StoryFn } from '@storybook/react'

export default {
  title: 'Home/HotBoard',
  component: HotBoard,
} as Meta<HotBoardProps>

const Template: StoryFn<HotBoardProps> = (args: HotBoardProps) => (
  <HotBoard {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  hotBoard: {
    title: '카페에서 남친이랑 싸웠어',
    content: '내가 말을 “만약에"라고 시작하면 너무 기빨린대',
    imgUrl: '/images/common/thumbnail.svg',
    boardMbti: '커플 게시판',
    likeCount: 30,
    commentCount: 18,
    createdAt: '1분 전',
    memberSimpleInfo: {
      id: 1,
      profileImgUrl: '/images/common/default.svg',
      nickName: '유보라',
      mbti: 'ENFP',
      badge: '엠비티어른',
    },
  },
}
