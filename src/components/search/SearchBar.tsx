import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'

interface SearchBarProps {
  keyword: string
  setKeyword: Dispatch<SetStateAction<string>>
  handleSearch: (searchKeyword?: string) => void
}

const SearchBar = ({ keyword, setKeyword, handleSearch }: SearchBarProps) => {
  const onButtonClick = () => {
    handleSearch()
  }

  return (
    <div className="flex items-center border-b border-maindark py-1 w-full">
      <input
        className="appearance-none bg-transparent border-none w-full text-maindark mr-3 py-1 focus:outline-none"
        type="text"
        placeholder="검색어를 입력해주세요."
        aria-label="Search"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch()
          }
        }}
      />
      <button
        className="flex-shrink-0 bg-transparent border-transparent"
        type="button"
        onClick={onButtonClick}
      >
        <Image
          src="/images/search/search.svg"
          alt="search"
          width={35}
          height={35}
        />
      </button>
    </div>
  )
}

export default SearchBar
