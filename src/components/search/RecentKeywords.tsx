import Button from '@/components/common/Button'
import { useRecentKeywords } from '@/service/search/useSearchService'

interface RecentKeywordsProps {
  handleSearch: (keyword: string) => void
}

const RecentKeywords = ({ handleSearch }: RecentKeywordsProps) => {
  const { data: recentKeywords } = useRecentKeywords()

  return (
    <div>
      <div className="text-title3 text-gray1 font-semibold mb-3">
        이전 검색어
      </div>
      <div className="flex flex-wrap gap-2">
        {Array.isArray(recentKeywords) ? (
          recentKeywords.map((item, idx: number) => (
            <Button
              key={idx}
              text={item.keyword}
              size="small"
              color="LIGHTPURPLE"
              onClick={() => handleSearch(item.keyword)}
            />
          ))
        ) : (
          <div>이전 검색어가 없습니다.</div>
        )}
      </div>
    </div>
  )
}

export default RecentKeywords
