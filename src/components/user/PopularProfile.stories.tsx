import { Meta, StoryFn } from '@storybook/react'
import PopularProfile, { PopularProfileProps } from './PopularProfile'

export default {
  title: 'Worry/PopularProfile',
  component: PopularProfile,
} as Meta<PopularProfileProps>

const Template: StoryFn<PopularProfileProps> = (args: PopularProfileProps) => (
  <PopularProfile {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  popularProfile: {
    id: 1,
    nickName: '유보라',
    mbti: 'ESFP',
    badge: '엠비티라노',
    profileImgUrl: '/images/common/default.svg',
    introduction: '진짜 어른이 되고 싶은 어른이에요',
  },
}
