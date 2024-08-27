import Comment, { CommentProps } from '@/components/board/Comment'
import { Meta, StoryFn } from '@storybook/react'

export default {
  title: 'Board/Comment',
  component: Comment,
} as Meta<CommentProps>

const Template: StoryFn<CommentProps> = (args: CommentProps) => (
  <Comment {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  comment: {
    commentId: 1,
    likeCount: 1,
    createdAt: '10분전',
    isLiked: false,
    isEditAllowed: false,
    parentId: 1,
    content:
      '말을 너무 많이 들으면 머리가 너무 아파요;; 말을 너무 많이 들으면 머리가 너무 아파요;; 말을 너무 많이 들으면 머리가 너무 아파요;; 말을 너무 많이 들으면 머리가 너무 아파요;; 말을 너무 많이 들으면 머리가 너무 아파요;; 말을 너무 많이 들으면 머리가 너무 아파요;;',
    memberSimpleInfo: {
      id: 1,
      profileImgUrl: '/images/common/default.svg',
      nickName: '유보라',
      mbti: 'ENFP',
      badge: '엠비티어른',
    },
  },
}
