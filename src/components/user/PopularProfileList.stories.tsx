import { Meta, StoryFn } from '@storybook/react'
import PopularProfileList from './PopularProfileList'

export default {
  title: 'Worry/PopularProfileList',
  component: PopularProfileList,
} as Meta

const Template: StoryFn = () => <PopularProfileList />

export const Primary = Template.bind({})
Primary.args = {}
