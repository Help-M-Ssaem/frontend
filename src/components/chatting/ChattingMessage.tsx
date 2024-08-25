import { ChattingMessageI } from '@/model/Chatting'
import Image from 'next/image'

export interface ChattingMessageProps {
  msg: ChattingMessageI
}

const ChattingMessage = ({ msg }: ChattingMessageProps) => {
  const { message, createdAt, sendWho } = msg

  return (
    <div
      className={`flex items-end mb-4 ${sendWho ? 'justify-start' : 'justify-end'}`}
    >
      <div
        className={`flex items-center gap-2.5 ${sendWho ? 'flex-row-reverse' : 'flex-row'}`}
      >
        <div className="text-caption text-gray2 whitespace-nowrap">
          {createdAt}
        </div>
        <div
          className={`text-headine text-gray2 font-semibold rounded-7.5 px-5 py-4  max-w-90 ${sendWho ? 'bg-main4' : 'bg-white border border-main'}`}
        >
          {message}
        </div>
        {sendWho && (
          <Image
            src="/images/common/default.svg"
            width={56}
            height={56}
            alt="profile"
          />
        )}
      </div>
    </div>
  )
}

export default ChattingMessage
