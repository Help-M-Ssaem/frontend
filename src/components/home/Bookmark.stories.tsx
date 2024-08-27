import Bookmark from '@/components/home/Bookmark'
import { Meta, StoryFn } from '@storybook/react'

export default {
  title: 'Home/Bookmark',
  component: Bookmark,
} as Meta

const Template: StoryFn = () => <Bookmark closeBookmarkPopup={() => {}} />

export const Primary = Template.bind({})
Primary.args = {}
