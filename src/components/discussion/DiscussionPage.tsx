'use client'

import DiscussionBoard from '@/components/discussion/DiscussionBoard'
import Pagination from '@/components/common/Pagination'
import { useDiscussionList } from '@/service/discussion/useDiscussionService'
import { useState, useEffect, Suspense } from 'react'
import Button from '@/components/common/Button'
import SearchBar from '@/components/common/SearchBar'
import { useToast } from '@/hooks/useToast'
import { useRouter, useSearchParams } from 'next/navigation'
import { DiscussionBoardI } from '@/model/Discussion'
import { useUserInfo } from '@/service/user/useUserService'
import Container from '../common/Container'

const DiscussionPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pageQuery = searchParams.get('page') || '1'

  const [page, setPage] = useState<number>(Number(pageQuery))
  const pageSize = 6

  const { data: discussionList } = useDiscussionList(page - 1, pageSize)
  const { data: userInfo } = useUserInfo()
  const { showToast } = useToast()

  const handleDiscussionBoardClick = (id: number) => {
    router.push(`/discussion/${id}`)
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    router.push(`/discussion?page=${newPage}`)
  }

  useEffect(() => {
    if (page !== Number(pageQuery)) {
      setPage(Number(pageQuery))
    }
  }, [pageQuery])

  const handleWriteClick = () => {
    if (!userInfo) {
      showToast('로그인이 필요한 서비스입니다')
      return
    }
    router.push('/discussion/create')
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex justify-between items-center my-4">
        <div className="text-title3 text-maindark font-semibold">
          MBTI 과몰입 토론
        </div>
        <Button
          text="글 쓰기"
          color="PURPLE"
          size="small"
          onClick={handleWriteClick}
        />
      </div>
      <div className="flex flex-col">
        {discussionList &&
          discussionList.result.map((discussion: DiscussionBoardI) => (
            <div key={discussion.id} className="flex flex-col">
              <Container
                color="purple"
                onClick={() => handleDiscussionBoardClick(discussion.id)}
                className="cursor-pointer"
              >
                <DiscussionBoard discussionBoard={discussion} />
              </Container>
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
    </Suspense>
  )
}

export default DiscussionPage
