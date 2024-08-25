'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ChattingInput from '@/components/chatting/ChattingInput'
import ChattingProfile from '@/components/chatting/ChattingProfile'
import ChattingMessage from '@/components/chatting/ChattingMessage'
import { useUserInfo } from '@/service/user/useUserService'
import { useParams, useRouter } from 'next/navigation'
import { ChattingMessageI, ChattingRoomI } from '@/model/Chatting'
import { useWebSocket } from '@/hooks/useSocket'

const Chatting = () => {
  const router = useRouter()
  const { id } = useParams()
  const chattingRoomId = Number(id)

  const [chatRooms, setChatRooms] = useState<ChattingRoomI[]>([])
  const [currentChatRoomId, setCurrentChatRoomId] = useState(chattingRoomId)
  const [messages, setMessages] = useState<{
    [key: number]: ChattingMessageI[]
  }>({})
  const [input, setInput] = useState('')
  const { socketRef, connectSocket, disconnectSocket, isConnected } =
    useWebSocket()
  const [worryBoardId, setWorryBoardId] = useState<number | null>(null)
  // 유저가 들어가있는 모든 채팅방 조회 API가 되면 거기서 worryBoardId를 가져와
  // 새로고침시에도 webSocket 재연결로 worryBoardId를 전달할 수 있도록 수정

  const { data: userInfo } = useUserInfo()

  /* 새로고침시 webSocket 재연결 */
  useEffect(() => {
    if (userInfo && currentChatRoomId) {
      const wsUrlUser = `wss://bkleacy8ff.execute-api.ap-northeast-2.amazonaws.com/mssaem?chatRoomId=${currentChatRoomId}&member=${userInfo.id}&worryBoardId=191`
      connectSocket(wsUrlUser)

      return () => {
        disconnectSocket()
      }
    }
  }, [userInfo, currentChatRoomId])

  /* 채팅방 목록 */
  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await axios.get(
          `https://ik7f6nxm8g.execute-api.ap-northeast-2.amazonaws.com/mssaem/chatroom?memberId=${userInfo && userInfo.id}`,
        )
        setChatRooms(response.data)
      } catch (error) {
        console.error('Failed to fetch chat rooms:', error)
      }
    }
    if (userInfo) {
      fetchChatRooms()
    }
  }, [userInfo])

  /* 현재 채팅방 메시지 */
  useEffect(() => {
    const fetchMessages = async (chatRoomId: number) => {
      try {
        const response = await axios.get(
          `https://ik7f6nxm8g.execute-api.ap-northeast-2.amazonaws.com/mssaem/chatmessage?chatRoomId=${chatRoomId}`,
        )
        setMessages((prevMessages) => ({
          ...prevMessages,
          [chatRoomId]: response.data,
        }))
      } catch (error) {
        console.error('Failed to fetch messages:', error)
      }
    }
    if (currentChatRoomId) {
      fetchMessages(currentChatRoomId)
    }
  }, [currentChatRoomId])

  const selectChatRoom = (chatRoomId: number) => {
    if (currentChatRoomId !== chatRoomId) {
      if (socketRef.current) {
        disconnectSocket()
      }
      setCurrentChatRoomId(chatRoomId)
      const wsUrlUser = `wss://bkleacy8ff.execute-api.ap-northeast-2.amazonaws.com/mssaem?chatRoomId=${chatRoomId}&member=${userInfo?.id}&worryBoardId=${chatRoomId}`

      connectSocket(wsUrlUser)

      if (socketRef.current) {
        socketRef.current.onopen = () => {
          console.log('WebSocket connected for chat room:', chatRoomId)
        }

        socketRef.current.onclose = () => {
          console.log('WebSocket disconnected for chat room:', chatRoomId)
          setTimeout(() => {
            console.log('Reconnecting WebSocket...')
            connectSocket(wsUrlUser)
          }, 3000) // 3초 후에 재연결 시도
        }

        socketRef.current.onerror = (error: any) => {
          console.error('WebSocket error:', error)
        }
      }

      router.push(`/chatting/${chatRoomId}`)
    }
  }

  /* 메시지 전송 */
  const sendMessage = () => {
    if (socketRef.current && input.trim() !== '') {
      const message = {
        action: 'sendMessage',
        chatRoomId: currentChatRoomId,
        message: input,
        memberId: userInfo && userInfo.id,
      }
      socketRef.current.send(JSON.stringify(message))
      setMessages((prevMessages) => ({
        ...prevMessages,
        [currentChatRoomId!]: [
          ...(prevMessages[currentChatRoomId!] || []),
          {
            message: input,
            createdAt: new Date().toISOString(),
            sendWho: true,
          },
        ],
      }))
      setInput('')
    }
  }

  return (
    <div className="w-full-vw ml-half-vw bg-main3 py-10">
      <div className="flex h-screen-40 border-7.5 mx-2% sm:mx-6% md:mx-13% bg-white rounded-7.5 shadow-custom-light">
        <div className="border-r flex flex-col overflow-y-scroll scrollbar-hide">
          <div className="flex items-center p-10 border-b text-title3 font-bold h-27.5">
            채팅 목록 {isConnected ? '(Connected)' : '(Disconnected)'}
          </div>
          <ul>
            {chatRooms &&
              chatRooms.map((room) => (
                <li
                  key={room.chatRoomId}
                  className="border-b last:border-none box-border p-4"
                >
                  <ChattingProfile
                    user={room.memberSimpleInfo}
                    lastMessage={room.lastMessage}
                    lastSendAt={room.lastSendAt}
                    onClick={() => selectChatRoom(room.chatRoomId)}
                  />
                </li>
              ))}
          </ul>
        </div>

        <div className="flex flex-col flex-1 bg-white rounded-7.5">
          <div className="flex items-center border-b p-4 h-27.5" />
          <div className="flex-1 overflow-y-auto box-border">
            {messages[currentChatRoomId!]?.map((msg, index) => (
              <div key={index} className="my-2 p-2 box-border">
                <ChattingMessage msg={msg} />
              </div>
            )) || <p className="p-4">No messages yet.</p>}
          </div>
          <div className="flex items-center p-6">
            <ChattingInput
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onClick={sendMessage}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chatting
