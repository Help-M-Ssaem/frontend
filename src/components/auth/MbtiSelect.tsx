'use client'

import Image from 'next/image'

export interface MbtiSelectProps {
  options: string[]
  selectedOption: string
  onSelect: (selectedOption: string) => void
}

const MbtiSelect = ({ options, selectedOption, onSelect }: MbtiSelectProps) => {
  const handleNextOption = () => {
    const currentIndex = options.indexOf(selectedOption)
    const nextIndex = (currentIndex + 1) % options.length
    const nextOption = options[nextIndex]
    onSelect(nextOption)
  }

  const handlePrevOption = () => {
    const currentIndex = options.indexOf(selectedOption)
    const prevIndex = (currentIndex - 1 + options.length) % options.length
    const prevOption = options[prevIndex]
    onSelect(prevOption)
  }

  return (
    <div className="flex gap-1">
      <div className="flex justify-center items-center w-15.5 h-14.5 border-2 border-gray4 rounded-3.75 text-title1 text-maindark font-bold bg-white">
        <span className="flex-grow text-center">{selectedOption}</span>
      </div>
      <div className="flex flex-col justify-center gap-3">
        <button
          type="button"
          className="focus:outline-none"
          onClick={handlePrevOption}
        >
          <Image
            src="/images/auth/up.svg"
            width={10}
            height={10}
            alt="up"
            className="w-4 h-4 text-gray-400"
          />
        </button>
        <button
          type="button"
          className="focus:outline-none"
          onClick={handleNextOption}
        >
          <Image
            src="/images/auth/down.svg"
            width={10}
            height={10}
            alt="down"
            className="w-4 h-4 text-gray-400"
          />
        </button>
      </div>
    </div>
  )
}

export default MbtiSelect
