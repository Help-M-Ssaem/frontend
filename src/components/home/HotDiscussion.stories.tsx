import HotDiscussion, {
  HotDiscussionProps,
} from '@/components/home/HotDiscussion'
import { Meta, StoryFn } from '@storybook/react'

export default {
  title: 'Home/HotDiscussion',
  component: HotDiscussion,
} as Meta<HotDiscussionProps>

const Template: StoryFn<HotDiscussionProps> = (args: HotDiscussionProps) => (
  <HotDiscussion {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  hotDiscussion: {
    id: 1,
    title: '머리가 더 꽃밭인 것 같은 MBTI는?',
    content: '머라고 생각하시나요?',
    participantCount: 51,
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
