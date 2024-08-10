'use client'

import DiscussionPage from '@/components/discussion/DiscussionPage'
import { Suspense } from 'react'

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DiscussionPage />
    </Suspense>
  )
}

export default Page
