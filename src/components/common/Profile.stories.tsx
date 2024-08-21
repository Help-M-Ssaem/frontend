import Profile, { ProfileProps } from '@/components/common/Profile'
import { Meta, StoryFn } from '@storybook/react'

export default {
  title: 'Common/Profile',
  component: Profile,
} as Meta<ProfileProps>

const Template: StoryFn<ProfileProps> = (args: ProfileProps) => (
  <Profile {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  user: {
    id: 1,
    profileImgUrl: '/images/common/default.svg',
    nickName: '유보라',
    mbti: 'ENFP',
    badge: '엠비티어른',
  },
}
