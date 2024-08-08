import { Meta, StoryFn } from '@storybook/react'
import WorryProfile, { WorryProfileProps } from './WorryProfile'

export default {
  title: 'Worry/WorryProfile',
  component: WorryProfile,
} as Meta<WorryProfileProps>

const Template: StoryFn<WorryProfileProps> = (args: WorryProfileProps) => (
  <WorryProfile {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  profileImgUrl: '/images/common/default.svg',
  nickName: '유보라',
  strFromMbti: 'ISTJ',
  strToMbti: 'ENFJ',
}
