import { Meta, StoryFn } from '@storybook/react'
import ChattingMessage, {
  ChattingMessageProps,
} from '@/components/chatting/ChattingMessage'

export default {
  title: 'Chatting/ChattingMessage',
  component: ChattingMessage,
} as Meta<ChattingMessageProps>

const Template: StoryFn<ChattingMessageProps> = (
  args: ChattingMessageProps,
) => <ChattingMessage {...args} />

export const SentMessage = Template.bind({})
SentMessage.args = {}

export const ReceivedMessage = Template.bind({})
ReceivedMessage.args = {}
