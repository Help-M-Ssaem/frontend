'use client'

import { ContainerAnimation } from '@/styles/animation'
import { motion } from 'framer-motion'
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
  <motion.div
    className={`w-full h-full p-4 sm:px-7.5 sm:py-5 rounded-7.5 ${ContainerTheme.color[color]} flex flex-col ${className}`}
    onClick={onClick}
    initial="hidden"
    animate="visible"
    variants={ContainerAnimation}
    transition={{ duration: 0.2 }}
  >
    {children}
  </motion.div>
)

Container.defaultProps = {
  onClick: undefined,
  className: '',
}

export default Container
