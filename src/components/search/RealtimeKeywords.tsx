import { useRealtimeKeywords } from '@/service/search/useSearchService'
import {
  ContainerAnimation,
  RealtimeKeywordAnimation,
} from '@/styles/animation'
import { motion } from 'framer-motion'

const RealtimeKeywords = () => {
  const { data: realtimeKeywords } = useRealtimeKeywords()

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={ContainerAnimation}
    >
      <div className="text-title3 text-gray1 font-semibold mb-3">
        인기 검색어
        <span className="text-caption font-regular text-gray3 ml-2">
          2023.07.14 18:06 기준
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {Array.isArray(realtimeKeywords) ? (
          realtimeKeywords.map((item: any, idx: number) => (
            <motion.div
              key={idx}
              initial="hidden"
              animate="visible"
              variants={RealtimeKeywordAnimation(idx)}
              className="flex items-center gap-4"
            >
              <span className="text-headline text-maindark font-semibold">
                {idx + 1}
              </span>
              {item.keyword}
            </motion.div>
          ))
        ) : (
          <div>실시간 인기 검색어를 불러오지 못했습니다.</div>
        )}
      </div>
    </motion.div>
  )
}

export default RealtimeKeywords
