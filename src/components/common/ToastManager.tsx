'use client'

import React, {
  useState,
  useCallback,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react'
import Toast from './Toast'

interface ToastManagerProps {}

export interface ToastOptions {
  id?: number
  message: string
  duration?: number
}

export interface ToastManagerHandle {
  addToast: (toast: ToastOptions) => void
}

const ToastManager = forwardRef<ToastManagerHandle, ToastManagerProps>(
  (props, ref) => {
    const [toasts, setToasts] = useState<ToastOptions[]>([])
    const toastId = useRef(0)

    const addToast = useCallback((toast: ToastOptions) => {
      const id = toastId.current + 1
      setToasts((prevToasts) => [...prevToasts, { ...toast, id }])

      setTimeout(() => {
        setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id))
      }, toast.duration || 3000)
    }, [])

    useImperativeHandle(ref, () => ({
      addToast,
    }))

    return (
      <div className="fixed top-4 right-4 z-50">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            duration={toast.duration}
            onClose={() =>
              setToasts((prevToasts) =>
                prevToasts.filter((t) => t.id !== toast.id),
              )
            }
          />
        ))}
      </div>
    )
  },
)

ToastManager.displayName = 'ToastManager'

export default ToastManager
