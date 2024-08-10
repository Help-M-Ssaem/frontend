'use client'

import WorryPage from '@/components/worry/WorryPage'
import { Suspense } from 'react'

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WorryPage />
    </Suspense>
  )
}

export default Page
