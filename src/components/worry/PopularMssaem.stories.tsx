import { Meta, StoryFn } from '@storybook/react'
import PopularMssaem, { PopularMssaemProps } from './PopularMssaem'

export default {
  title: 'Worry/PopularMssaem',
  component: PopularMssaem,
} as Meta<PopularMssaemProps>

const Template: StoryFn<PopularMssaemProps> = (args: PopularMssaemProps) => (
  <PopularMssaem {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  popularMssaem: {
    id: 1,
    nickName: '유보라',
    mbti: 'ESFP',
    badge: '엠비티라노',
    profileImgUrl: '/images/common/default.svg',
    introduction: '진짜 어른이 되고 싶은 어른이에요',
  },
}
