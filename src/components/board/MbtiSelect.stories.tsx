import { Meta, StoryFn } from '@storybook/react'
import MbtiSelect, { MbtiSelectProps } from './MbtiSelect'

export default {
  title: 'Board/MbtiSelect',
  component: MbtiSelect,
} as Meta

const Template: StoryFn<MbtiSelectProps> = (args) => <MbtiSelect {...args} />

export const Primary = Template.bind({})
Primary.args = {
  mbti: 'ISTJ',
  setMbti: () => {},
}
