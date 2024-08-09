import { useState } from 'react'
import Pagination, { PaginationProps } from '@/components/common/Pagination'
import { Meta, StoryFn } from '@storybook/react'

export default {
  title: 'Common/Pagination',
  component: Pagination,
} as Meta

const Template: StoryFn<PaginationProps> = ({
  pagesCount,
  currentPage: initialCurrentPage,
  onPageChange,
}: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(initialCurrentPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    onPageChange(page)
  }

  return (
    <Pagination
      pagesCount={pagesCount}
      currentPage={currentPage}
      onPageChange={handlePageChange}
    />
  )
}

export const Primary = Template.bind({})
Primary.args = {
  pagesCount: 5,
  currentPage: 1,
  onPageChange: () => {},
}
