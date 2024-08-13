import { CommentInputProps } from '@/service/comment/CommentService'
import { Meta, StoryFn } from '@storybook/react'
import CommentInput from './CommentInput'

export default {
  title: 'Board/CommentInput',
  component: CommentInput,
} as Meta<CommentInputProps>

const Template: StoryFn<CommentInputProps> = (args: CommentInputProps) => (
  <CommentInput {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  id: 1,
  page: 0,
  size: 10,
}
