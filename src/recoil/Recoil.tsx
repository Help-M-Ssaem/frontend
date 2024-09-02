'use client'

import { ReactNode } from 'react'
import { RecoilRoot } from 'recoil'

interface RecoilRootProps {
  children: ReactNode
}

const Recoil = ({ children }: RecoilRootProps) => {
  return <RecoilRoot>{children}</RecoilRoot>
}

export default Recoil
