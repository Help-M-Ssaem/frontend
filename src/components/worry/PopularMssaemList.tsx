import { usePopularMssaem } from '@/service/home/useHomeService'
import PopularMssaem from './PopularMssaem'

const PopularMssaemList = () => {
  const { data: popularMssaem } = usePopularMssaem()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {popularMssaem &&
        popularMssaem.map((mssaem) => (
          <PopularMssaem key={mssaem.id} popularMssaem={mssaem} />
        ))}
    </div>
  )
}

export default PopularMssaemList
