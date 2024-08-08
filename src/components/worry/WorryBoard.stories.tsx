import { Meta, StoryFn } from '@storybook/react'
import WorryBoard, { WorryBoardProps } from './WorryBoard'

export default {
  title: 'Worry/WorryBoard',
  component: WorryBoard,
} as Meta<WorryBoardProps>

const Template: StoryFn<WorryBoardProps> = (args: WorryBoardProps) => (
  <WorryBoard {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  worryBoard: {
    id: 1,
    title: '학생회장 선배 도와주세요ㅠㅠ',
    content: '마음이 있는 것 같나요??',
    memberMbti: 'ISTJ',
    targetMbti: 'ESFP',
    createdDate: '3분전',
    imgUrl: '/images/common/thumbnail.svg',
  },
}
