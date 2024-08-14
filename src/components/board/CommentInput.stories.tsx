import { Meta, StoryFn } from '@storybook/react'
import CommentInput, { CommentInputProps } from './CommentInput'

export default {
  title: 'Board/CommentInput',
  component: CommentInput,
} as Meta<CommentInputProps>

const Template: StoryFn<CommentInputProps> = (args: CommentInputProps) => (
  <CommentInput {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
