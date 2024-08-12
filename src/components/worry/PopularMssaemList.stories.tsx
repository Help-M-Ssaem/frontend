import { Meta, StoryFn } from '@storybook/react'
import PopularMssaemList from './PopularMssaemList'

export default {
  title: 'Worry/PopularMssaemList',
  component: PopularMssaemList,
} as Meta

const Template: StoryFn = () => <PopularMssaemList />

export const Primary = Template.bind({})
Primary.args = {}
