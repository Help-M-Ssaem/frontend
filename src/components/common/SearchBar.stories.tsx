import SearchBar, { SearchBarProps } from '@/components/common/SearchBar'
import { Meta, StoryFn } from '@storybook/react'

export default {
  title: 'Common/SearchBar',
  component: SearchBar,
} as Meta<SearchBarProps>

const Template: StoryFn<SearchBarProps> = (args: SearchBarProps) => (
  <SearchBar {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  onSearch: (filter, query) => {
    console.log('filter:', filter)
    console.log('query:', query)
  },
}
