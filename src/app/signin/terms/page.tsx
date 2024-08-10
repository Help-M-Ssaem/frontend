'use client'

import React, { useState, useEffect } from 'react'
import Button from '@/components/common/Button'
import LabeledButton from '@/components/common/LabeledButton'
import Textarea from '@/components/common/Textarea'
import { useRouter } from 'next/navigation'

// TODO: 약관 내용 DB 넣기
const TERMS = [
  '회원 가입 시 이름, 생년월일, 휴대전화번호 등의 정보를 허위로 기재해서는 안 됩니다. 회원 계정에 등록된 정보는 항상 정확한 최신 정보가 유지될 수 있도록 관리해 주세요. 자신의 계정을 다른 사람에게 판매, 양도, 대여 또는 담보로 제공하거나 다른 사람에게 그 사용을 허락해서는 안 됩니다. 아울러 자신의 계정이 아닌 타인의 계정을 무단으로 사용해서는 안 됩니다. 이에 관한 상세한 내용은 계정 운영 정책을 참고해 주시기 바랍니다.',
  '회원 가입 시 이름, 생년월일, 휴대전화번호 등의 정보를 허위로 기재해서는 안 됩니다. 회원 계정에 등록된 정보는 항상 정확한 최신 정보가 유지될 수 있도록 관리해 주세요. 자신의 계정을 다른 사람에게 판매, 양도, 대여 또는 담보로 제공하거나 다른 사람에게 그 사용을 허락해서는 안 됩니다. 아울러 자신의 계정이 아닌 타인의 계정을 무단으로 사용해서는 안 됩니다. 이에 관한 상세한 내용은 계정 운영 정책을 참고해 주시기 바랍니다.',
  '회원 가입 시 이름, 생년월일, 휴대전화번호 등의 정보를 허위로 기재해서는 안 됩니다. 회원 계정에 등록된 정보는 항상 정확한 최신 정보가 유지될 수 있도록 관리해 주세요. 자신의 계정을 다른 사람에게 판매, 양도, 대여 또는 담보로 제공하거나 다른 사람에게 그 사용을 허락해서는 안 됩니다. 아울러 자신의 계정이 아닌 타인의 계정을 무단으로 사용해서는 안 됩니다. 이에 관한 상세한 내용은 계정 운영 정책을 참고해 주시기 바랍니다.',
]

const Terms = () => {
  const router = useRouter()
  const [checkedTerms, setCheckedTerms] = useState<boolean[]>([
    false,
    false,
    false,
  ])
  const [isAllChecked, setIsAllChecked] = useState(false)

  useEffect(() => {
    const savedTerms = localStorage.getItem('checkedTerms')
    if (savedTerms) {
      const parsedTerms = JSON.parse(savedTerms)
      setCheckedTerms(parsedTerms)
      setIsAllChecked(parsedTerms.every((term: boolean) => term))
    }
  }, [])

  const handleTermChange = (index: number) => {
    const updatedCheckedTerms = [...checkedTerms]
    updatedCheckedTerms[index] = !updatedCheckedTerms[index]
    setCheckedTerms(updatedCheckedTerms)
    setIsAllChecked(updatedCheckedTerms.every((term) => term))
    localStorage.setItem('checkedTerms', JSON.stringify(updatedCheckedTerms))
  }

  const handleAllChange = () => {
    const newState = !isAllChecked
    const updatedCheckedTerms = [newState, newState, newState]
    setCheckedTerms(updatedCheckedTerms)
    setIsAllChecked(newState)
    localStorage.setItem('checkedTerms', JSON.stringify(updatedCheckedTerms))
  }

  const handleNextClick = () => {
    router.push('/signin/info')
  }

  return (
    <div className="flex flex-col justify-center gap-10 my-18 w-full max-w-95 mx-auto text-center">
      <div className="text-maindark text-title1 font-bold">이용약관</div>
      <div className="flex flex-col gap-5">
        <LabeledButton
          label="[필수] 회원가입"
          isClicked={checkedTerms[0]}
          onClick={() => handleTermChange(0)}
        />
        <Textarea value={TERMS[0]} color="gray" size="large" />
      </div>
      <div className="flex flex-col gap-5">
        <LabeledButton
          label="[필수] 회원가입"
          isClicked={checkedTerms[1]}
          onClick={() => handleTermChange(1)}
        />
        <Textarea value={TERMS[1]} color="gray" size="large" />
      </div>
      <div className="flex flex-col gap-5">
        <LabeledButton
          label="[필수] 회원가입"
          isClicked={checkedTerms[2]}
          onClick={() => handleTermChange(2)}
        />
        <Textarea value={TERMS[2]} color="gray" size="large" />
      </div>
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
        />
      </div>
    </div>
  )
}

export default Terms
