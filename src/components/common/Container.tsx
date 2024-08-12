'use client'

import React, { ReactNode } from 'react'

const ContainerTheme = {
  color: {
    white: 'bg-white',
    purple: 'bg-main3',
  },
}

type Color = keyof typeof ContainerTheme.color

export interface ContainerProps {
  children: ReactNode
  color: Color
  onClick?: () => void
  className?: string
}

const Container = ({ children, color, onClick, className }: ContainerProps) => (
  <div
    className={`w-full h-full px-7.5 py-5 rounded-7.5 ${ContainerTheme.color[color]} flex flex-col ${className}`}
    onClick={onClick}
  >
    {children}
  </div>
)

Container.defaultProps = {
  onClick: undefined,
  className: '',
}

export default Container
