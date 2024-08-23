import { usePopularProfile } from '@/service/home/useHomeService'
import PopularProfile from './PopularProfile'

const PopularProfileList = () => {
  const { data: popularProfile } = usePopularProfile()

  return (
    <div className="w-full-vw ml-half-vw px-4% sm:px-8% md:px-13% bg-main3">
      <div className="text-title3 font-semibold text-main2 text-center py-3 sm:py-6">
        인기 M쌤
      </div>
      <div className="h-[1px] bg-main" />
      <div className="overflow-x-auto scrollbar-hide py-9">
        <div className="flex gap-4 min-w-max">
          {popularProfile &&
            popularProfile.slice(0, 4).map((mssaem) => (
              <div key={mssaem.id} className="flex-1 min-w-[25%]">
                <PopularProfile popularProfile={mssaem} />
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default PopularProfileList
