'use client'

import { ReactNode } from 'react'
import { RecoilRoot, MutableSnapshot } from 'recoil'
import { userInfoState } from '@/recoil/UserInfo'

interface RecoilRootProps {
  children: ReactNode
  initialUserInfo?: any
}

const initializeState = (snapshot: MutableSnapshot, initialUserInfo?: any) => {
  if (initialUserInfo) {
    snapshot.set(userInfoState, initialUserInfo)
  }
}

const Recoil = ({ children, initialUserInfo }: RecoilRootProps) => {
  return (
    <RecoilRoot
      initializeState={(snapshot) => initializeState(snapshot, initialUserInfo)}
    >
      {children}
    </RecoilRoot>
  )
}

Recoil.defaultProps = {
  initialUserInfo: null,
}

export default Recoil
