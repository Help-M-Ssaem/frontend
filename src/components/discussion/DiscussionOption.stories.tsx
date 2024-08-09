import { Meta, StoryFn } from '@storybook/react'
import DiscussionOption, { DiscussionOptionProps } from './DiscussionOption'

export default {
  title: 'Discussion/DiscussionOption',
  component: DiscussionOption,
  argTypes: {
    text: { control: 'text' },
    imgUrl: { control: 'text' },
    onClick: { action: 'clicked' },
    disabled: { control: 'boolean' },
  },
} as Meta<DiscussionOptionProps>

const Template: StoryFn<DiscussionOptionProps> = (
  args: DiscussionOptionProps,
) => <DiscussionOption {...args} />

export const SmallPrimary = Template.bind({})
SmallPrimary.args = {
  discussionOption: {
    id: 1,
    content: '글쓰기',
    selectedPercent: '0',
    selected: false,
    disabled: false,
  },
  size: 'small',
}

export const SmallImageButton = Template.bind({})
SmallImageButton.args = {
  discussionOption: {
    id: 1,
    content: '글쓰기',
    imgUrl: '/images/common/thumbnail.svg',
    selectedPercent: '0',
    selected: false,
    disabled: false,
  },
  size: 'small',
}

export const LargePrimary = Template.bind({})
LargePrimary.args = {
  discussionOption: {
    id: 1,
    content: '글쓰기',
    selectedPercent: '0',
    selected: false,
    disabled: false,
  },
  size: 'large',
}

export const LargeImageButton = Template.bind({})
LargeImageButton.args = {
  discussionOption: {
    id: 1,
    content: '글쓰기',
    imgUrl: '/images/common/thumbnail.svg',
    selectedPercent: '0',
    selected: false,
    disabled: false,
  },
  size: 'large',
}
