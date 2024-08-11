import { Meta, StoryFn } from '@storybook/react'
import UserProfile, { UserProfileProps } from './UserProfile'

export default {
  title: 'Auth/UserProfile',
  component: UserProfile,
} as Meta<UserProfileProps>

const Template: StoryFn<UserProfileProps> = (args: UserProfileProps) => (
  <UserProfile {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  userProfile: {
    id: 1,
    nickName: '유보라',
    mbti: 'ESFP',
    badge: '엠비티라노',
    profileImageurl: '/images/common/default.svg',
    introduction: '진짜 어른이 되고 싶은 어른이에요',
  },
}
