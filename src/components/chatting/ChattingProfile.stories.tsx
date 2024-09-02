import { Meta, StoryFn } from '@storybook/react'
import ChattingProfile, {
  ChattingProfileProps,
} from '@/components/chatting/ChattingProfile'

export default {
  title: 'Chatting/ChattingProfile',
  component: ChattingProfile,
} as Meta<ChattingProfileProps>

const Template: StoryFn<ChattingProfileProps> = (
  args: ChattingProfileProps,
) => <ChattingProfile {...args} />

export const Primary = Template.bind({})
Primary.args = {}
