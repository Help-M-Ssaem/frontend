import dynamic from 'next/dynamic'
import type { Metadata } from 'next'
import '../styles/globals.css'
import Recoil from '@/recoil/Recoil'
import localFont from 'next/font/local'
import ReactQueryProviders from '@/hooks/useReactQuery'
import Toaster from '@/components/common/Toaster'
import { WebSocketProvider } from '@/hooks/useSocket'
import LoadUserInfo from '@/service/user/LoadUserInfo'

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="kr">
      <link rel="icon" href="/images/common/cat_logo.svg" sizes="any" />
      <body className={`${pretendard.variable} font-pretendard`}>
        <Recoil>
          <LoadUserInfo />
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
