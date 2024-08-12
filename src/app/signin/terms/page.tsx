'use client'

import React, { useState } from 'react'
import Button from '@/components/common/Button'
import LabeledButton from '@/components/common/LabeledButton'
import Textarea from '@/components/common/Textarea'
import { useRouter } from 'next/navigation'
import { useTerms } from '@/service/user/useUserService'

interface Term {
  content: string
}

const Terms = () => {
  const router = useRouter()
  const { data: terms } = useTerms()

  const [checkedTerms, setCheckedTerms] = useState<boolean[]>([
    false,
    false,
    false,
  ])
  const [isAllChecked, setIsAllChecked] = useState(false)

  const handleTermChange = (index: number) => {
    const updatedCheckedTerms = [...checkedTerms]
    updatedCheckedTerms[index] = !updatedCheckedTerms[index]
    setCheckedTerms(updatedCheckedTerms)
    setIsAllChecked(updatedCheckedTerms.every((term) => term))
  }

  const handleAllChange = () => {
    const newState = !isAllChecked
    const updatedCheckedTerms = new Array(terms.length).fill(newState)
    setCheckedTerms(updatedCheckedTerms)
    setIsAllChecked(newState)
  }

  const handleNextClick = () => {
    if (checkedTerms.every((term) => term)) {
      router.push('/signin/info')
    }
  }

  return (
    <div className="flex flex-col justify-center gap-10 my-18 w-full max-w-95 mx-auto text-center">
      <div className="text-maindark text-title1 font-bold">이용약관</div>
      {terms &&
        terms.map((term: Term, index: number) => (
          <div key={index} className="flex flex-col gap-5">
            <LabeledButton
              label="[필수] 회원가입"
              isClicked={checkedTerms[index]}
              onClick={() => handleTermChange(index)}
            />
            <Textarea value={term.content} color="gray" size="large" />
          </div>
        ))}
      <div className="flex flex-col gap-5">
        <LabeledButton
          label="전체동의"
          isClicked={isAllChecked}
          onClick={handleAllChange}
        />
        <Button
          text="다음"
          color="GRAY"
          size="login"
          onClick={handleNextClick}
          disabled={!checkedTerms.every((term) => term)}
          className={`${checkedTerms.every((term) => term) ? 'bg-main2' : ''}`}
        />
      </div>
    </div>
  )
}

export default Terms
