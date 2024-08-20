'use client'

import {
  ToastManagerHandle,
  ToastOptions,
} from '@/components/common/ToastManager'
import { useContext, createContext, useRef } from 'react'

const ToastContext = createContext<React.RefObject<ToastManagerHandle> | null>(
  null,
)

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const toastManagerRef = useRef<ToastManagerHandle>(null)

  return (
    <ToastContext.Provider value={toastManagerRef}>
      {children}
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }

  const showToast = (options: ToastOptions) => {
    context.current?.addToast(options)
  }

  return { showToast }
}
