import { Meta, StoryFn } from '@storybook/react'
import SearchInput from '@/components/search/SearchInput'

export default {
  title: 'Search/SearchInput',
  component: SearchInput,
} as Meta

const Template: StoryFn = () => <SearchInput />

export const Primary = Template.bind({})
Primary.args = {}
