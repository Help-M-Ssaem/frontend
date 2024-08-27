'use client'

import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import ChattingInput from '@/components/chatting/ChattingInput'
import ChattingProfile from '@/components/chatting/ChattingProfile'
import ChattingMessage from '@/components/chatting/ChattingMessage'
import { useUserInfo } from '@/service/user/useUserService'
import { useParams } from 'next/navigation'
import { ChattingMessageI, ChattingRoomI } from '@/model/Chatting'

const Chatting = () => {
  const { id } = useParams()
  const chattingRoomId = Number(id)

  const [chatRooms, setChatRooms] = useState<ChattingRoomI[]>([])
  const [currentChatRoomId, setCurrentChatRoomId] = useState(chattingRoomId)
  const [messages, setMessages] = useState<ChattingMessageI[]>([])
  const [input, setInput] = useState('')
  const { data: userInfo } = useUserInfo()

  const socketRefs = useRef<{ [key: number]: WebSocket }>({})

  const connectToWebSocket = (room: ChattingRoomI) => {
    const wsUrlUser = `wss://bkleacy8ff.execute-api.ap-northeast-2.amazonaws.com/mssaem?chatRoomId=${room.chatRoomId}&member=${userInfo?.id}&worryBoardId=${room.worryBoardId}`
    const socket = new WebSocket(wsUrlUser)

    socket.onmessage = (event) => {
      const newMessage = JSON.parse(event.data)
      if (room.chatRoomId === currentChatRoomId) {
        setMessages((prevMessages) => [...prevMessages, newMessage])
      }
    }

    socket.onopen = () => {
      console.log(`Connected to WebSocket for room ${room.chatRoomId}`)
    }

    socket.onclose = () => {
      console.log(`WebSocket closed for room ${room.chatRoomId}`)
      // 자동 재연결 로직
      setTimeout(() => connectToWebSocket(room), 3000)
    }

    socket.onerror = (error) => {
      console.error(`WebSocket error for room ${room.chatRoomId}`, error)
    }

    socketRefs.current[room.chatRoomId] = socket
  }

  /* 유저가 들어가 있는 모든 채팅방 조회 및 WebSocket 연결 */
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
      Object.values(socketRefs.current).forEach((socket) => socket.close())
    }
  }, [userInfo, currentChatRoomId])

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
    if (socketRefs.current[currentChatRoomId] && input.trim() !== '') {
      const message = {
        action: 'sendMessage',
        chatRoomId: currentChatRoomId,
        message: input,
        memberId: userInfo?.id.toString(),
      }
      socketRefs.current[currentChatRoomId].send(JSON.stringify(message))
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
