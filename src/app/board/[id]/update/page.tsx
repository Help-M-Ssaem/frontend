'use client'

import BoardUpdatePage from '@/components/board/BoardUpdatePage'
import { Suspense } from 'react'

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BoardUpdatePage />
    </Suspense>
  )
}

export default Page
