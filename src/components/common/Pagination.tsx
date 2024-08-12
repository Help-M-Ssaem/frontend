import React, { useState, useEffect } from 'react'

export interface PaginationProps {
  pagesCount: number
  currentPage: number
  onPageChange: (page: number) => void
}

const Pagination = ({
  pagesCount,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const [currentPageGroup, setCurrentPageGroup] = useState<number>(1)
  const pagesPerGroup = 5

  const totalGroups = Math.ceil(pagesCount / pagesPerGroup)

  useEffect(() => {
    const newPageGroup = Math.ceil(currentPage / pagesPerGroup)
    setCurrentPageGroup(newPageGroup)
  }, [currentPage])

  const startPage = (currentPageGroup - 1) * pagesPerGroup + 1
  const endPage = Math.min(currentPageGroup * pagesPerGroup, pagesCount)

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  )

  const handlePageChange = (page: number) => {
    onPageChange(page)
    window.scrollTo({ top: 0, behavior: 'smooth' }) // 화면을 최상단으로 부드럽게 스크롤
  }

  const handlePreviousGroup = () => {
    if (currentPageGroup > 1) {
      const newPageGroup = currentPageGroup - 1
      setCurrentPageGroup(newPageGroup)
      handlePageChange((newPageGroup - 1) * pagesPerGroup + 1)
    }
  }

  const handleNextGroup = () => {
    if (currentPageGroup < totalGroups) {
      const newPageGroup = currentPageGroup + 1
      setCurrentPageGroup(newPageGroup)
      handlePageChange((newPageGroup - 1) * pagesPerGroup + 1)
    }
  }

  return (
    <nav>
      <ul className="flex justify-center items-center gap-3">
        <li className={`page-item ${currentPageGroup === 1 ? 'disabled' : ''}`}>
          <button
            type="button"
            className="text-headline text-gray2 font-semibold"
            onClick={handlePreviousGroup}
            disabled={currentPageGroup === 1}
          >
            이전
          </button>
        </li>
        {pages.map((page) => (
          <li key={page} className={`${page === currentPage ? 'active' : ''}`}>
            <button
              type="button"
              className={`text-headline text-gray2 font-semibold w-8 h-8 border rounded-[3px] ${
                page === currentPage
                  ? 'border-main2 bg-main4 text-maindark'
                  : 'border-transparent'
              }`}
              onClick={() => handlePageChange(page)}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          </li>
        ))}
        <li
          className={`page-item ${
            currentPageGroup === totalGroups ? 'disabled' : ''
          }`}
        >
          <button
            type="button"
            className="text-headline text-gray2 font-semibold"
            onClick={handleNextGroup}
            disabled={currentPageGroup === totalGroups}
          >
            다음
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination
