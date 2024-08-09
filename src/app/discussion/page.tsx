'use client'

import DiscussionBoard from '@/components/discussion/DiscussionBoard'
import Pagination from '@/components/common/Pagination'
import { useDiscussionList } from '@/service/discussion/useDiscussionService'
import { useState, useEffect } from 'react'
import SearchBar from '@/components/common/SearchBar'
import { useRouter, useSearchParams } from 'next/navigation'

const DiscussionPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pageQuery = searchParams.get('page') || '1'

  const [page, setPage] = useState<number>(Number(pageQuery))
  const pageSize = 6

  const { data: discussionList } = useDiscussionList(page - 1, pageSize)

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    router.push(`/discussion?page=${newPage}`)
  }

  useEffect(() => {
    if (page !== Number(pageQuery)) {
      setPage(Number(pageQuery))
    }
  }, [pageQuery])

  return (
    <>
      <div className="text-title3 text-maindark font-semibold my-5">
        MBTI 과몰입 토론
      </div>
      <div className="flex flex-col">
        {discussionList &&
          discussionList.result.map((discussion) => (
            <div key={discussion.id} className="flex flex-col">
              <DiscussionBoard discussionBoard={discussion} />
              <div className="h-[1px] bg-gray4 my-2.5 sm:my-12.5" />
            </div>
          ))}
      </div>

      {discussionList && (
        <div className="mt-5">
          <Pagination
            pagesCount={discussionList.totalSize}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      <div className="my-7.5">
        <SearchBar onSearch={() => {}} />
      </div>
    </>
  )
}

export default DiscussionPage
