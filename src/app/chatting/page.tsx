'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ChattingInput from '@/components/chatting/ChattingInput'
import ChattingProfile from '@/components/chatting/ChattingProfile'
import ChattingMessage from '@/components/chatting/ChattingMessage'
import { useUserInfo } from '@/service/user/useUserService'
import { useParams } from 'next/navigation'
import { ChattingMessageI, ChattingRoomI } from '@/model/Chatting'
import { useWebSocket } from '@/hooks/useSocket'

const Chatting = () => {
  const { id } = useParams()
  const chattingRoomId = Number(id)

  const [chatRooms, setChatRooms] = useState<ChattingRoomI[]>([])
  const [currentChatRoomId, setCurrentChatRoomId] = useState(chattingRoomId)
  const [messages, setMessages] = useState<ChattingMessageI[]>([])
  const [input, setInput] = useState('')
  const { data: userInfo } = useUserInfo()
  const { connectSocket, disconnectSocket, socketRefs } = useWebSocket()

  const handleWebSocketMessage = (event: MessageEvent, roomId: number) => {
    const newMessage = JSON.parse(event.data)
    if (roomId === currentChatRoomId) {
      setMessages((prevMessages) => [...prevMessages, newMessage])
    }
  }

  const connectToWebSocket = (room: ChattingRoomI) => {
    const key = String(room.chatRoomId)

    // 이미 연결된 WebSocket이 있는 경우 재연결하지 않음
    if (socketRefs[key] && socketRefs[key]!.readyState === WebSocket.OPEN) {
      console.log(`WebSocket already connected for room ${room.chatRoomId}`)
      return
    }

    const wsUrlUser = `wss://bkleacy8ff.execute-api.ap-northeast-2.amazonaws.com/mssaem?chatRoomId=${room.chatRoomId}&member=${userInfo?.id}&worryBoardId=${room.worryBoardId}`

    connectSocket(wsUrlUser, key)

    if (socketRefs[key]) {
      socketRefs[key]!.onmessage = (event) =>
        handleWebSocketMessage(event, room.chatRoomId)
      socketRefs[key]!.onclose = () => {
        console.log(`WebSocket closed for room ${room.chatRoomId}`)
        setTimeout(() => connectToWebSocket(room), 1000)
      }
      socketRefs[key]!.onerror = (error) => {
        console.error(`WebSocket error for room ${room.chatRoomId}`, error)
      }
    }
  }

  useEffect(() => {
    const fetchChatRoomsAndConnectSockets = async () => {
      try {
        const response = await axios.get(
          `https://ik7f6nxm8g.execute-api.ap-northeast-2.amazonaws.com/mssaem/chatroom?memberId=${userInfo?.id}`,
        )
        const rooms = response.data
        setChatRooms(rooms)

        rooms.forEach((room: ChattingRoomI) => {
          connectToWebSocket(room)
        })
      } catch (error) {
        console.error('Failed to fetch chat rooms:', error)
      }
    }

    if (userInfo) {
      fetchChatRoomsAndConnectSockets()
    }

    return () => {
      // 컴포넌트 언마운트 시 모든 WebSocket 연결을 종료
      chatRooms.forEach((room) => {
        disconnectSocket(String(room.chatRoomId))
      })
    }
  }, [userInfo])

  useEffect(() => {
    if (currentChatRoomId) {
      const selectedRoom = chatRooms.find(
        (room) => room.chatRoomId === currentChatRoomId,
      )

      if (selectedRoom) {
        const fetchMessages = async () => {
          try {
            const response = await axios.get(
              `https://ik7f6nxm8g.execute-api.ap-northeast-2.amazonaws.com/mssaem/chatmessage?chatRoomId=${currentChatRoomId}`,
            )
            setMessages(response.data)
          } catch (error) {
            console.error('Failed to fetch messages:', error)
          }
        }
        fetchMessages()
      }
    }
  }, [currentChatRoomId])

  /* 메시지 전송 */
  const sendMessage = () => {
    if (socketRefs[String(currentChatRoomId)] && input.trim() !== '') {
      const message = {
        action: 'sendMessage',
        chatRoomId: currentChatRoomId,
        message: input,
        memberId: userInfo?.id.toString(),
      }
      socketRefs[String(currentChatRoomId)]?.send(JSON.stringify(message))
      setMessages((prevMessages: any) => [
        ...prevMessages,
        {
          message: input,
          timestamp: new Date().toISOString(),
          memberId: userInfo?.id.toString(),
        },
      ])
      setInput('')
    }
  }

  return (
    <div className="w-full-vw ml-half-vw bg-main3 py-10">
      <div className="flex h-screen-40 border-7.5 mx-2% sm:mx-6% md:mx-13% bg-white rounded-7.5 shadow-custom-light">
        <div className="border-r flex flex-col overflow-y-scroll scrollbar-hide">
          <div className="flex items-center p-10 border-b text-title3 font-bold h-27.5">
            채팅 목록
          </div>
          <ul>
            {chatRooms.map((room) => (
              <li
                key={room.chatRoomId}
                className="border-b last:border-none box-border p-4"
              >
                <ChattingProfile
                  user={room.memberSimpleInfo}
                  lastMessage={room.lastMessage}
                  lastSendAt={room.lastSendAt}
                  onClick={() => setCurrentChatRoomId(room.chatRoomId)}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col flex-1 bg-white rounded-7.5">
          <div className="flex items-center border-b p-4 h-27.5" />
          <div className="flex-1 overflow-y-auto box-border">
            {messages.length > 0 ? (
              messages.map((msg, index) => (
                <div key={index} className="my-2 p-2 box-border">
                  <ChattingMessage msg={msg} />
                </div>
              ))
            ) : (
              <p className="p-4">No messages yet.</p>
            )}
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
