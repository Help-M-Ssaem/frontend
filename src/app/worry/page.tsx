'use client'

import Container from '@/components/common/Container'
import MbtiSelect from '@/components/worry/MbtiSelect'
import WorryBoard from '@/components/worry/WorryBoard'
import {
  useSolvedWorryList,
  useWaitingWorryList,
} from '@/service/worry/useWorryService'
import { useState } from 'react'

const WorryPage = () => {
  const [waitingStrFromMbti, setWaitingStrFromMbti] = useState('ALL')
  const [waitingStrToMbti, setWaitingStrToMbti] = useState('ALL')
  const [solvedStrFromMbti, setSolvedStrFromMbti] = useState('ALL')
  const [solvedStrToMbti, setSolvedStrToMbti] = useState('ALL')

  const { data: waitingWorryList } = useWaitingWorryList(
    0,
    10,
    waitingStrFromMbti,
    waitingStrToMbti,
  )
  const { data: solvedWorryList } = useSolvedWorryList(
    0,
    10,
    solvedStrFromMbti,
    solvedStrToMbti,
  )

  return (
    <div className="flex flex-col">
      <div className="text-title3 text-maindark font-semibold m-5">
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
            <>
              <WorryBoard key={worry.id} worryBoard={worry} />
              <div className="h-[1px] bg-main" />
            </>
          ))}
      </Container>

      <div className="text-title3 text-maindark font-semibold m-5">
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
            <>
              <WorryBoard key={worry.id} worryBoard={worry} />
              <div className="h-[1px] bg-main" />
            </>
          ))}
      </Container>
    </div>
  )
}

export default WorryPage
