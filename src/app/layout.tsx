'use client'

import dynamic from 'next/dynamic'
import type { Metadata } from 'next'
import '../styles/globals.css'
import Recoil from '@/recoil/Recoil'
import localFont from 'next/font/local'
import ReactQueryProviders from '@/hooks/useReactQuery'
import Toaster from '@/components/common/Toaster'
import { WebSocketProvider } from '@/hooks/useSocket'
import { userInfoState } from '@/recoil/UserInfo'
import { useSetRecoilState } from 'recoil'
import { useEffect } from 'react'
import UserService from '@/service/user/UserService'

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
})

export const metadata: Metadata = {
  title: '도와줘요 M쌤 | MBTI 고민상담소',
  description: '도와줘요 M쌤 | MBTI 고민상담소',
  icons: {
    icon: '/images/common/cat_logo.svg',
  },
}

const Header = dynamic(() => import('@/components/common/Header'), {
  ssr: false,
})
const Footer = dynamic(() => import('@/components/common/Footer'), {
  ssr: false,
})

export async function getServerSideProps() {
  try {
    const response = await UserService.fetchUserInfo()
    return {
      props: {
        initialUserInfo: response.data,
      },
    }
  } catch (error) {
    console.error('Failed to fetch user info:', error)
    return {
      props: {
        initialUserInfo: null,
      },
    }
  }
}

export default function RootLayout({
  children,
  initialUserInfo,
}: {
  children: React.ReactNode
  initialUserInfo: any
}) {
  const setUserInfo = useSetRecoilState(userInfoState)

  useEffect(() => {
    if (initialUserInfo) {
      setUserInfo(initialUserInfo)
    }
  }, [initialUserInfo, setUserInfo])

  return (
    <html lang="kr">
      <link rel="icon" href="/images/common/cat_logo.svg" sizes="any" />
      <body className={`${pretendard.variable} font-pretendard`}>
        <Recoil>
          <WebSocketProvider>
            <ReactQueryProviders>
              <main className="py-3 px-5 sm:px-7% md:px-10% ">
                <Header />
                {children}
                <Footer />
                <Toaster />
              </main>
            </ReactQueryProviders>
          </WebSocketProvider>
        </Recoil>
      </body>
    </html>
  )
}
