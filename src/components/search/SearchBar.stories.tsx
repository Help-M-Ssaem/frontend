import { Meta, StoryFn } from '@storybook/react'
import SearchBar from './SearchBar'

export default {
  title: 'Search/SearchBar',
  component: SearchBar,
} as Meta

const Template: StoryFn = () => (
  <SearchBar keyword="" setKeyword={() => {}} handleSearch={() => {}} />
)

export const Primary = Template.bind({})
Primary.args = {}
