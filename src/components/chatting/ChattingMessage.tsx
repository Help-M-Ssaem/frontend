import { ChattingMessageI } from '@/model/Chatting'
import Image from 'next/image'

export interface ChattingMessageProps {
  message: ChattingMessageI
  isReceived: boolean
}

const ChattingMessage = ({ message, isReceived }: ChattingMessageProps) => {
  const { content, sendAt } = message

  return (
    <div
      className={`flex items-end mb-4 ${isReceived ? 'justify-start' : 'justify-end'}`}
    >
      <div
        className={`flex items-center gap-2.5 ${isReceived ? 'flex-row-reverse' : 'flex-row'}`}
      >
        <div className="text-caption text-gray2 whitespace-nowrap">
          {sendAt}
        </div>
        <div
          className={`text-headine text-gray2 font-semibold rounded-7.5 px-5 py-4  max-w-90 ${isReceived ? 'bg-main4' : 'bg-white border border-main'}`}
        >
          {content}
        </div>
        {isReceived && (
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
