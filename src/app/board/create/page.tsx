'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const Page = () => {
  const BoardCreatePage = dynamic(
    () => import('@/components/board/BoardCreatePage'),
    {
      ssr: false,
    },
  )

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BoardCreatePage />
    </Suspense>
  )
}

export default Page
