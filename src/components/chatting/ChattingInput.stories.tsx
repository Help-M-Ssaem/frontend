import { Meta, StoryFn } from '@storybook/react'
import ChattingInput, {
  ChattingInputProps,
} from '@/components/chatting/ChattingInput'

export default {
  title: 'Chatting/ChattingInput',
  component: ChattingInput,
} as Meta<ChattingInputProps>

const Template: StoryFn<ChattingInputProps> = (args: ChattingInputProps) => (
  <ChattingInput {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
