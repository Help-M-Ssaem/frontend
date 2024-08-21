'use client'

import Image from 'next/image'
import { WorryI } from '@/model/Worry'
import { useRouter } from 'next/navigation'
import Button from '../common/Button'

export interface WorryBoardProps {
  worryBoard: WorryI
}

const MAX_CONTENT_LENGTH = 35

const WorryBoard = ({ worryBoard }: WorryBoardProps) => {
  const router = useRouter()

  const { id, title, content, memberMbti, targetMbti, createdDate, imgUrl } =
    worryBoard

  const truncatedContent =
    content.length > MAX_CONTENT_LENGTH
      ? `${content.substring(0, MAX_CONTENT_LENGTH)}...`
      : content

  return (
    <div
      className="flex justify-between items-center cursor-pointer"
      onClick={() => {
        router.push(`/worry/${id}`)
      }}
    >
      <div className="flex flex-col gap-3.5">
        <div className="flex items-center gap-2.5">
          <Button text={memberMbti} color={memberMbti} size="badge" />
          <Image
            src="/images/worry/arrow_right.svg"
            alt="arrow"
            width={18}
            height={4}
          />
          <Button text={targetMbti} color={targetMbti} size="badge" />
          <p className="text-gray2 text-caption">{createdDate}</p>
        </div>
        <div className="flex flex-col gap-1.75">
          <div className="text-title3 font-semibold text-maindark">{title}</div>
          <div
            className="text-body font-regular text-maindark"
            dangerouslySetInnerHTML={{ __html: truncatedContent }}
          />
        </div>
      </div>
      {imgUrl && <Image src={imgUrl} alt="image" width={84} height={84} />}
    </div>
  )
}

export default WorryBoard
