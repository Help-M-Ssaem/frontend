import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const Page = () => {
  const BoardUpdatePage = dynamic(
    () => import('@/components/board/BoardUpdatePage'),
    {
      ssr: false,
    },
  )

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BoardUpdatePage />
    </Suspense>
  )
}

export default Page
