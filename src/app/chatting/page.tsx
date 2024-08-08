'use client'

const Chatting = () => {
  // const chatRoomId = 1
  // const member = 1
  // const [messages, setMessages] = useState<string[]>([])
  // const [input, setInput] = useState<string>('')
  // const [isConnected, setIsConnected] = useState<boolean>(false)
  // const socketRef = useRef<WebSocket | null>(null)
  // useEffect(() => {
  //   const socket = new WebSocket(
  //     `wss://lc3cc1cnma.execute-api.ap-northeast-2.amazonaws.com/mssaem?chatRoomId=${chatRoomId}&member=${member}`,
  //   )
  //   socket.onopen = () => {
  //     console.log('WebSocket Opened')
  //     setIsConnected(true)
  //   }
  //   socket.onmessage = (event: MessageEvent<string>) => {
  //     console.log('WebSocket Message:', event.data)
  //     setMessages((prev) => [...prev, event.data])
  //   }
  //   socket.onerror = (error: Event) => {
  //     console.error('WebSocket Error:', error)
  //   }
  //   socket.onclose = () => {
  //     console.log('WebSocket is closed')
  //     setIsConnected(false)
  //   }
  //   socketRef.current = socket
  //   return () => {
  //     socket.close()
  //   }
  // }, [chatRoomId, member])
  // const sendMessage = () => {
  //   if (socketRef.current && input.trim() !== '') {
  //     const message = {
  //       action: 'sendMessage',
  //       chatRoomId: 1,
  //       message: input,
  //     }
  //     socketRef.current.send(JSON.stringify(message))
  //     setInput('')
  //   }
  // }
  // const disconnect = () => {
  //   if (socketRef.current) {
  //     socketRef.current.close()
  //     socketRef.current = null
  //     setIsConnected(false)
  //   }
  // }
  // return (
  //   <div>
  //     <h1>Chatting</h1>
  //     <div>
  //       {messages.map((msg, index) => (
  //         <div key={index}>{msg}</div>
  //       ))}
  //     </div>
  //     <input
  //       type="text"
  //       value={input}
  //       onChange={(e) => setInput(e.target.value)}
  //       onKeyPress={(e) => {
  //         if (e.key === 'Enter') {
  //           sendMessage()
  //         }
  //       }}
  //     />
  //     {/* <button onClick={sendMessage}>Send</button>
  //     {isConnected && <button onClick={disconnect}>Disconnect</button>} */}
  //   </div>
  // )

  return <div>test</div>
}

export default Chatting
