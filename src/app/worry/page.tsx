'use client'

import Container from '@/components/common/Container'
import MbtiSelect from '@/components/worry/MbtiSelect'
import WorryBoard from '@/components/worry/WorryBoard'
import Pagination from '@/components/common/Pagination'
import {
  useSolvedWorryList,
  useWaitingWorryList,
} from '@/service/worry/useWorryService'
import { useState } from 'react'
import SearchBar from '@/components/common/SearchBar'

const WorryPage = () => {
  const [waitingPage, setWaitingPage] = useState<number>(1)
  const [solvedPage, setSolvedPage] = useState<number>(1)

  const [waitingStrFromMbti, setWaitingStrFromMbti] = useState('ALL')
  const [waitingStrToMbti, setWaitingStrToMbti] = useState('ALL')
  const [solvedStrFromMbti, setSolvedStrFromMbti] = useState('ALL')
  const [solvedStrToMbti, setSolvedStrToMbti] = useState('ALL')

  const pageSize = 6

  const { data: waitingWorryList } = useWaitingWorryList(
    waitingPage - 1,
    pageSize,
    waitingStrFromMbti,
    waitingStrToMbti,
  )
  const { data: solvedWorryList } = useSolvedWorryList(
    solvedPage - 1,
    pageSize,
    solvedStrFromMbti,
    solvedStrToMbti,
  )

  const handleWaitingPageChange = (newPage: number) => {
    setWaitingPage(newPage)
  }
  const handleSolvedPageChange = (newPage: number) => {
    setSolvedPage(newPage)
  }

  return (
    <div className="flex flex-col">
      <div className="text-title3 text-maindark font-semibold my-5">
        M쌤 매칭을 기다리는 고민
      </div>
      <Container color="purple">
        <MbtiSelect
          strFromMbti={waitingStrFromMbti}
          strToMbti={waitingStrToMbti}
          setStrFromMbti={setWaitingStrFromMbti}
          setStrToMbti={setWaitingStrToMbti}
        />
        <div className="h-[1px] bg-main" />
        {waitingWorryList &&
          waitingWorryList.result.map((worry) => (
            <div key={worry.id}>
              <WorryBoard worryBoard={worry} />
              <div className="h-[1px] bg-main" />
            </div>
          ))}

        {waitingWorryList && (
          <div className="mt-5">
            <Pagination
              pagesCount={waitingWorryList.totalSize}
              currentPage={waitingPage}
              onPageChange={handleWaitingPageChange}
            />
          </div>
        )}
      </Container>

      <div className="text-title3 text-maindark font-semibold my-5">
        해결 완료된 고민
      </div>
      <Container color="purple">
        <MbtiSelect
          strFromMbti={solvedStrFromMbti}
          strToMbti={solvedStrToMbti}
          setStrFromMbti={setSolvedStrFromMbti}
          setStrToMbti={setSolvedStrToMbti}
        />
        <div className="h-[1px] bg-main" />
        {solvedWorryList &&
          solvedWorryList.result.map((worry) => (
            <div key={worry.id}>
              <WorryBoard worryBoard={worry} />
              <div className="h-[1px] bg-main" />
            </div>
          ))}

        {solvedWorryList && (
          <div className="mt-5">
            <Pagination
              pagesCount={solvedWorryList.totalSize}
              currentPage={solvedPage}
              onPageChange={handleSolvedPageChange}
            />
          </div>
        )}

        <div className="my-7.5">
          <SearchBar onSearch={() => {}} />
        </div>
      </Container>
    </div>
  )
}

export default WorryPage
