import { Meta, StoryFn } from '@storybook/react'
import RealtimeKeywords from '@/components/search/RealtimeKeywords'

export default {
  title: 'Search/RealtimeKeywords',
  component: RealtimeKeywords,
} as Meta

const Template: StoryFn = () => <RealtimeKeywords />

export const Primary = Template.bind({})
Primary.args = {}
