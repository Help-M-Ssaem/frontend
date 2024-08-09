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
SentMessage.args = {
  message: {
    content: '안녕하세요 도와주세요 어쩌고 저쩌고 머시라 머시라',
    sendAt: '오후 11:32',
  },
  isReceived: false,
}

export const ReceivedMessage = Template.bind({})
ReceivedMessage.args = {
  message: {
    content: '안녕하세요 도와주세요 어쩌고 저쩌고 머시라 머시라',
    sendAt: '오후 11:32',
  },
  isReceived: true,
}
