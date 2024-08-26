import Bookmark from '@/components/board/Bookmark'
import { Meta, StoryFn } from '@storybook/react'

export default {
  title: 'Board/Bookmark',
  component: Bookmark,
} as Meta

const Template: StoryFn = () => <Bookmark closeBookmarkPopup={() => {}} />

export const Primary = Template.bind({})
Primary.args = {}
