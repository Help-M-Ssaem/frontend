import Image from 'next/image'
import React, { useState } from 'react'

const options = [
  { value: '제목+내용', label: '제목+내용' },
  { value: '제목', label: '제목' },
  { value: '내용', label: '내용' },
]

export interface SearchBarProps {
  onSearch: (filter: string, query: string) => void
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [filter, setFilter] = useState<string>('제목+내용')
  const [query, setQuery] = useState<string>('')

  const handleSearch = () => {
    onSearch(filter, query)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="flex items-center gap-5.5 justify-center w-full">
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border border-gray4 rounded-[5px] px-2 py-2.5 text-gray2 cursor-pointer focus:outline-none focus:border-gray4"
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="text-gray2"
          >
            {option.label}
          </option>
        ))}
      </select>
      <div className="relative flex-grow max-w-lg">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="검색어를 입력해주세요."
          className="border border-gray4 rounded-[5px] px-2 py-2.5 w-full pr-10 text-gray2 focus:outline-none focus:border-gray4"
        />
        <button
          type="button"
          onClick={handleSearch}
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
        >
          <Image
            src="/images/common/search.svg"
            alt="검색"
            width={24}
            height={24}
          />
        </button>
      </div>
    </div>
  )
}

export default SearchBar
