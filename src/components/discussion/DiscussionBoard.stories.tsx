import DiscussionBoard, {
  DiscussionBoardProps,
} from '@/components/discussion/DiscussionBoard'
import { Meta, StoryFn } from '@storybook/react'

export default {
  title: 'Discussion/DiscussionBoard',
  component: DiscussionBoard,
} as Meta<DiscussionBoardProps>

const Template: StoryFn<DiscussionBoardProps> = (
  args: DiscussionBoardProps,
) => <DiscussionBoard {...args} />

export const Primary = Template.bind({})
Primary.args = {
  discussionBoard: {
    id: 1,
    title: '친구가 지각 했는데 미안하다고 안 한다',
    content: '어떻게 할 거임?',
    participantCount: 51,
    commentCount: 18,
    createdAt: '24.06.21',
    memberSimpleInfo: {
      id: 1,
      profileImgUrl: '/images/common/default.svg',
      nickName: '유보라',
      mbti: 'ENFP',
      badge: '엠비티어른',
    },
    options: [],
  },
}
