import React from 'react'

interface ToastProps {
  show: boolean
  children: React.ReactNode
}

const Toast = ({ show, children }: ToastProps) => {
  return (
    <div
      className={`${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } whitespace-nowrap transition-all duration-500 ease-in-out bg-gray-800 text-white py-3 px-6 rounded-lg shadow-lg fixed bottom-8 left-1/2 transform -translate-x-1/2 mb-2`}
    >
      {children}
    </div>
  )
}

export { Toast }
