'use client'

import { useState } from 'react'
import Image from 'next/image'
import { MBTI, mbtiTypes } from '@/types/mbtiTypes'

export interface MbtiSelectProps {
  mbti: MBTI
  setMbti: (mbti: MBTI) => void
}

const MbtiSelect = ({ mbti, setMbti }: MbtiSelectProps) => {
  const [showDropdown, setShowDropdown] = useState(false)

  const handleMbtiClick = () => {
    setShowDropdown(!showDropdown)
  }
  const handleMbtiSelect = (type: MBTI) => {
    setMbti(type)
    setShowDropdown(false)
  }

  return (
    <div className="flex gap-3 relative mb-3">
      <div
        className="text-title1 font-bold text-maindark cursor-pointer"
        onClick={handleMbtiClick}
      >
        {mbti} 게시판
      </div>
      {showDropdown && (
        <div className="absolute left-0 top-full bg-white border border-gray4 rounded-3.75 p-5 mt-2 z-10 min-w-max">
          <div className="grid grid-cols-5 gap-4">
            {mbtiTypes.map((type) => (
              <button
                key={type}
                type="button"
                className="text-gray2 text-footnote px-2"
                onClick={() => handleMbtiSelect(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      )}
      <Image
        src="/images/common/arrow_down.svg"
        width={12}
        height={9}
        alt="arrow_down"
        className="cursor-pointer"
        onClick={handleMbtiClick}
      />
    </div>
  )
}

export default MbtiSelect
