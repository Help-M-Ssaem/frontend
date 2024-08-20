'use client'

import React, { useEffect, useState } from 'react'

export interface ToastProps {
  message: string
  duration?: number
  onClose: () => void
}

const Toast = ({ message, duration = 3000, onClose }: ToastProps) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  if (!visible) return null

  return (
    <div className="bg-gray-800 text-white px-4 py-2 rounded shadow-lg mb-4">
      {message}
    </div>
  )
}

Toast.defaultProps = {
  duration: 3000,
}

export default Toast
