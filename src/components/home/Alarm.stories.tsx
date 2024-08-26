import Alarm from '@/components/home/Alarm'
import { Meta, StoryFn } from '@storybook/react'

export default {
  title: 'Home/Alarm',
  component: Alarm,
} as Meta

const Template: StoryFn = () => <Alarm closeAlarmPopup={() => {}} />

export const Primary = Template.bind({})
Primary.args = {}
