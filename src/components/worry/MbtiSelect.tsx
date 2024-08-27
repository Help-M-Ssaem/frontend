'use client'

import Image from 'next/image'
import { useState } from 'react'
import Dropdown from '@/components/worry/Dropdown'

export interface MbtiSelectProps {
  strFromMbti: string
  strToMbti: string
  setStrFromMbti: (str: string) => void
  setStrToMbti: (str: string) => void
}

const MbtiSelect = ({
  strFromMbti,
  strToMbti,
  setStrFromMbti,
  setStrToMbti,
}: MbtiSelectProps) => {
  const [showLeftDropdown, setShowLeftDropdown] = useState(false)
  const [showRightDropdown, setShowRightDropdown] = useState(false)

  const handleLeftTypeClick = (type: string) => {
    setStrFromMbti(type === '전체' ? 'ALL' : type)
    setShowLeftDropdown(false)
  }

  const handleRightTypeClick = (type: string) => {
    setStrToMbti(type === '전체' ? 'ALL' : type)
    setShowRightDropdown(false)
  }

  const displayType = (type: string) => (type === 'ALL' ? '전체' : type)

  return (
    <div className="flex relative w-full">
      <div className="flex justify-between items-center gap-1.5 backdrop:sm:gap-4">
        <Dropdown
          selectedType={displayType(strFromMbti)}
          showDropdown={showLeftDropdown}
          onToggleDropdown={() => setShowLeftDropdown(!showLeftDropdown)}
          onSelectType={handleLeftTypeClick}
        />
        <Image
          src="/images/worry/arrow_right.svg"
          alt="arrow_right"
          width={18}
          height={7}
        />
        <Dropdown
          selectedType={displayType(strToMbti)}
          showDropdown={showRightDropdown}
          onToggleDropdown={() => setShowRightDropdown(!showRightDropdown)}
          onSelectType={handleRightTypeClick}
        />
      </div>
    </div>
  )
}

export default MbtiSelect
