'use client'

import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useMemo,
} from 'react'

interface WebSocketContextValue {
  socketRefs: { [key: string]: WebSocket | null }
  connectSocket: (url: string, key: string) => void
  // disconnectSocket: (key: string) => void
  isConnected: (key: string) => boolean
}

const WebSocketContext = createContext<WebSocketContextValue | null>(null)

export const WebSocketProvider = ({ children }: any) => {
  const socketRefs = useRef<{ [key: string]: WebSocket | null }>({})
  const [connectedKeys, setConnectedKeys] = useState<Set<string>>(new Set())

  const connectSocket = (url: string, key: string) => {
    if (socketRefs.current[key]) {
      socketRefs.current[key]?.close()
    }
    socketRefs.current[key] = new WebSocket(url)

    socketRefs.current[key]!.onopen = () => {
      setConnectedKeys((prev) => new Set(prev).add(key))
      console.log(`WebSocket connected for key: ${key}`)
    }

    // socketRefs.current[key]!.onclose = () => {
    //   setConnectedKeys((prev) => {
    //     const newSet = new Set(prev)
    //     newSet.delete(key)
    //     return newSet
    //   })
    //   console.log(`WebSocket disconnected for key: ${key}`)
    // }

    // socketRefs.current[key]!.onerror = (error) => {
    //   console.error(`WebSocket error for key ${key}:`, error)
    //   setConnectedKeys((prev) => {
    //     const newSet = new Set(prev)
    //     newSet.delete(key)
    //     return newSet
    //   })
    // }
  }

  // const disconnectSocket = (key: string) => {
  //   if (socketRefs.current[key]) {
  //     socketRefs.current[key]?.close()
  //     socketRefs.current[key] = null
  //     setConnectedKeys((prev) => {
  //       const newSet = new Set(prev)
  //       newSet.delete(key)
  //       return newSet
  //     })
  //   }
  // }

  const isConnected = (key: string) => {
    return connectedKeys.has(key)
  }

  const value = useMemo(
    () => ({
      socketRefs: socketRefs.current,
      connectSocket,
      // disconnectSocket,
      isConnected,
    }),
    [connectedKeys],
  )

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  )
}

export const useWebSocket = () => {
  const context = useContext(WebSocketContext)
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider')
  }
  return context
}
