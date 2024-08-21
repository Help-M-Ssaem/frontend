import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const Page = () => {
  const WorryCreatePage = dynamic(
    () => import('@/components/worry/WorryCreatePage'),
    {
      ssr: false,
    },
  )

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WorryCreatePage />
    </Suspense>
  )
}

export default Page
