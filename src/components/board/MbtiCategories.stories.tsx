import { Meta, StoryFn } from '@storybook/react'
import MbtiCategories, { MbtiCategoriesProps } from './MbtiCategories'

export default {
  title: 'Board/MbtiCategories',
  component: MbtiCategories,
} as Meta

const Template: StoryFn<MbtiCategoriesProps> = (args) => (
  <MbtiCategories {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  selectedMbti: 'ISTJ',
}
