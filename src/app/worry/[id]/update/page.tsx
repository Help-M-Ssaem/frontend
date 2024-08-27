'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const Page = () => {
  const WorryUpdatePage = dynamic(
    () => import('@/components/worry/WorryUpdatePage'),
    {
      ssr: false,
    },
  )

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WorryUpdatePage />
    </Suspense>
  )
}

export default Page
