import { Meta, StoryFn } from '@storybook/react'
import UserProfileUpdate from './UserProfileUpdate'

export default {
  title: 'Auth/UserProfileUpdate',
  component: UserProfileUpdate,
} as Meta

const Template: StoryFn = (args) => (
  <UserProfileUpdate {...args} onUpdate={() => console.log('onUpdate')} />
)

export const Primary = Template.bind({})
Primary.args = {}
