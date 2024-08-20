import Login, { LoginProps } from '@/components/auth/Login'
import { Meta, StoryFn } from '@storybook/react'

export default {
  title: 'Auth/Login',
  component: Login,
} as Meta<LoginProps>

const Template: StoryFn<LoginProps> = (args: LoginProps) => <Login {...args} />

export const Primary = Template.bind({})
Primary.args = {
  user: {
    profileImgUrl: '/images/common/default.svg',
    nickName: '유보라',
    mbti: 'ENFP',
    badge: '엠비티어른',
  },
}
