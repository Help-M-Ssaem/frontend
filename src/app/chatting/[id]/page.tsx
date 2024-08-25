'use client'

import ChattingInput from '@/components/chatting/ChattingInput'
import ChattingProfile from '@/components/chatting/ChattingProfile'
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useUserInfo } from '@/service/user/useUserService'
import { ChattingRoomI } from '@/model/Chatting'

const Chatting = () => {
  const [chatRooms, setChatRooms] = useState<ChattingRoomI[]>([])
  const [currentChatRoomId, setCurrentChatRoomId] = useState<number | null>(
    null,
  )
  const [messages, setMessages] = useState<{ [key: number]: string[] }>({})
  const [input, setInput] = useState<string>('')
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const socketRef = useRef<WebSocket | null>(null)
  const { data: userInfo } = useUserInfo()

  // 유저가 참여한 모든 채팅방을 조회
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
    fetchChatRooms()
  }, [])

  /* 특정 채팅방의 메시지를 조회 */
  useEffect(() => {
    if (currentChatRoomId !== null) {
      const fetchMessages = async () => {
        try {
          const response = await axios.get(
            `https://ik7f6nxm8g.execute-api.ap-northeast-2.amazonaws.com/mssaem/chatmessage?chatRoomId=${currentChatRoomId}`,
          )
          setMessages((prevMessages) => ({
            ...prevMessages,
            [currentChatRoomId]: response.data.messages,
          }))
        } catch (error) {
          console.error('Failed to fetch messages:', error)
        }
      }

      fetchMessages()

      // 웹소켓 연결 설정
      const socket = new WebSocket(
        `wss://lc3cc1cnma.execute-api.ap-northeast-2.amazonaws.com/mssaem?chatRoomId=${currentChatRoomId}&member=${userInfo && userInfo.id}`,
      )
      socketRef.current = socket

      socket.onopen = () => {
        setIsConnected(true)
      }

      socket.onmessage = (event) => {
        const receivedMessage = JSON.parse(event.data)
        setMessages((prevMessages) => ({
          ...prevMessages,
          [currentChatRoomId]: [
            ...(prevMessages[currentChatRoomId] || []),
            receivedMessage.message,
          ],
        }))
      }
      return () => {
        socket.close()
      }
    }
  }, [currentChatRoomId])

  /* 채팅 메세지 보내기 */
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
          input,
        ],
      }))
      setInput('')
    }
  }

  /* 채팅방 연결 해제 */
  const disconnect = () => {
    if (socketRef.current) {
      socketRef.current.close()
      socketRef.current = null
      setIsConnected(false)
    }
  }

  /* 채팅방 선택 */
  const selectChatRoom = (chatRoomId: number) => {
    if (isConnected) {
      disconnect()
    }
    setCurrentChatRoomId(chatRoomId)
  }

  return (
    <div className="w-full-vw ml-half-vw bg-main3 py-10">
      <div className="flex h-screen-40 border-7.5 mx-2% sm:mx-6% md:mx-13% bg-white rounded-7.5 shadow-custom-light ">
        {/* Left Sidebar for 채팅 목록 */}
        <div className="border-r flex flex-col overflow-y-scroll scrollbar-hide">
          <div className="flex items-center p-10 border-b text-title3 font-bold h-27.5">
            채팅 목록
          </div>
          <ul className="">
            {chatRooms.map((room) => (
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

        {/* Right Content for 채팅 내역 */}
        <div className="flex flex-col flex-1 bg-white rounded-7.5">
          <div className="flex items-center border-b p-4 h-27.5">
            {/* <Profile user={user} /> */}
          </div>

          <div className="flex-1 overflow-y-auto box-border">
            {messages[currentChatRoomId!]?.map((msg, index) => (
              <div key={index} className="my-2 p-2 box-border">
                {msg}
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
