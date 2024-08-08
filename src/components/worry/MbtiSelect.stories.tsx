import { Meta, StoryFn } from '@storybook/react'
import MbtiSelect, { MbtiSelectProps } from './MbtiSelect'

export default {
  title: 'Worry/MbtiSelect',
  component: MbtiSelect,
} as Meta

const Template: StoryFn<MbtiSelectProps> = (args: MbtiSelectProps) => (
  <MbtiSelect {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  strFromMbti: 'ISTJ',
  strToMbti: 'ENFJ',
  setStrFromMbti: () => {},
  setStrToMbti: () => {},
}
