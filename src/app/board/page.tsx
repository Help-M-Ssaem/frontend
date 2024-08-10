'use client'

import BoardPage from '@/components/board/BoardPage'
import { Suspense } from 'react'

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BoardPage />
    </Suspense>
  )
}

export default Page
