import { Meta, StoryFn } from '@storybook/react'
import RecentKeywords from './RecentKeywords'

export default {
  title: 'Search/RecentKeywords',
  component: RecentKeywords,
} as Meta

const Template: StoryFn = () => (
  <RecentKeywords
    handleSearch={(keyword: string) => {
      console.log(keyword)
    }}
  />
)

export const Primary = Template.bind({})
Primary.args = {}
