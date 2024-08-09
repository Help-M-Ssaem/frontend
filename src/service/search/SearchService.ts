import Service from '@/apis/AxiosInstance'
import { MBTI } from '@/components/common/Button'
import { BoardSearch, WorrySearch } from '@/model/Search'

export interface SearchProps {
  searchType: number
  keyword: string
  strMbti?: MBTI
  strFromMbti?: MBTI
  strToMbti?: MBTI
  page: number
  size: number
}

class SearchService extends Service {
  getBoardSearch({ searchType, keyword, strMbti, page, size }: SearchProps) {
    return this.http.get<BoardSearch>(
      `boards/search?searchType=${searchType}&keyword=${keyword}$strMbti=${strMbti}$page=${page}&size=${size}`,
    )
  }

  getSolvedWorrySearch({
    searchType,
    keyword,
    strFromMbti,
    strToMbti,
    page,
    size,
  }: SearchProps) {
    return this.http.get<WorrySearch>(
      `/worry-board/solved/search?searchType=${searchType}&keyword=${keyword}$strFromMbti=${strFromMbti}$strToMbti=${strToMbti}$page=${page}&size=${size}`,
    )
  }

  getWaitingWorrySearch({
    searchType,
    keyword,
    strFromMbti,
    strToMbti,
    page,
    size,
  }: SearchProps) {
    return this.http.get<WorrySearch>(
      `/worry-board/waiting/search?searchType=${searchType}&keyword=${keyword}$strFromMbti=${strFromMbti}$strToMbti=${strToMbti}$page=${page}&size=${size}`,
    )
  }

  getDiscussionSearch({ searchType, keyword, page, size }: SearchProps) {
    return this.http.get<BoardSearch>(
      `/discussions/search?searchType=${searchType}&keyword=${keyword}$page=${page}&size=${size}`,
    )
  }
}

export default new SearchService()
