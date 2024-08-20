'use client'

import BoardCreatePage from '@/components/board/BoardCreatePage'
import { Suspense } from 'react'

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BoardCreatePage />
    </Suspense>
  )
}

export default Page
