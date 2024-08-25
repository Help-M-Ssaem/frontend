'use client'

import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  useMemo,
} from 'react'

const WebSocketContext = createContext<any>(null)

export const WebSocketProvider = ({ children }: any) => {
  const socketRef = useRef<WebSocket | null>(null) // 타입 명시
  const [isConnected, setIsConnected] = useState(false)

  const connectSocket = (url: string) => {
    if (socketRef.current) {
      socketRef.current.close()
    }
    socketRef.current = new WebSocket(url)

    socketRef.current.onopen = () => {
      setIsConnected(true)
      console.log('WebSocket connected')
    }

    socketRef.current.onclose = () => {
      setIsConnected(false)
      console.log('WebSocket disconnected')
    }

    socketRef.current.onerror = (error) => {
      console.error('WebSocket error:', error)
      setIsConnected(false)
    }
  }

  const disconnectSocket = () => {
    if (socketRef.current) {
      socketRef.current.close()
      socketRef.current = null
      setIsConnected(false)
    }
  }

  useEffect(() => {
    return () => {
      disconnectSocket()
    }
  }, [])

  // useMemo를 사용하여 value 객체를 메모이제이션
  const value = useMemo(
    () => ({
      socketRef,
      connectSocket,
      disconnectSocket,
      isConnected,
    }),
    [isConnected], // 종속성 배열에 필요한 값 추가
  )

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  )
}

export const useWebSocket = () => {
  return useContext(WebSocketContext)
}
