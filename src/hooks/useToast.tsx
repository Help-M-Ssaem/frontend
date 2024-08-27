'use client'

import { useEffect, useState } from 'react'

const TOAST_REMOVE_DELAY = 2000

interface Toast {
  id: string
  message: string
  show: boolean
}

let toasts: Toast[] = []
let count = 0

const genId = (): string => {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

const timeouts = new Map<string, ReturnType<typeof setTimeout>>()
const listeners: Array<(toasts: Toast[]) => void> = []

const showToast = (message: string) => {
  const id = genId()

  if (!toasts.find((toast) => toast.id === id)) {
    toasts = [...toasts, { id, message, show: true }]
  }

  listeners.forEach((listener) => {
    listener(toasts)
  })

  const timeout = setTimeout(() => {
    toasts = toasts.map((toast) =>
      toast.id === id ? { ...toast, show: false } : toast,
    )

    listeners.forEach((listener) => {
      listener(toasts)
    })

    const maxTimeoutId = Array.from(timeouts.entries()).reduce((a, b) =>
      b[1] > a[1] ? b : a,
    )[0]

    if (maxTimeoutId === id) {
      toasts = []
      timeouts.clear()
    }
  }, TOAST_REMOVE_DELAY)

  timeouts.set(id, timeout)
}

export const useToast = () => {
  const [state, setState] = useState<Toast[]>([...toasts])

  useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [])

  return {
    showToast,
    toasts: state,
  }
}
