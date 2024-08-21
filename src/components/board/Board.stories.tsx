import Board, { BoardProps } from '@/components/board/Board'
import { Meta, StoryFn } from '@storybook/react'

export default {
  title: 'Board/Board',
  component: Board,
} as Meta<BoardProps>

const Template: StoryFn<BoardProps> = (args: BoardProps) => <Board {...args} />

export const Primary = Template.bind({})
Primary.args = {
  board: {
    id: 1,
    title: '카페에서 남친이랑 싸웠어',
    content: '내가 말을 “만약에"라고 시작하면 너무 기빨린대',
    imgUrl: '/images/common/thumbnail.svg',
    likeCount: 30,
    commentCount: 18,
    createdAt: '24.07.25',
    memberSimpleInfo: {
      id: 1,
      profileImgUrl: '/images/common/default.svg',
      nickName: '유보라',
      mbti: 'ENFP',
      badge: '엠비티어른',
    },
  },
}
