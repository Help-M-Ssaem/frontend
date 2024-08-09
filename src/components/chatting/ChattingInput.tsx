'use client'

import Button from '../common/Button'

export interface ChattingInputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClick: () => void
}

const ChattingInput = ({ value, onChange, onClick }: ChattingInputProps) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onClick()
    }
  }

  return (
    <div className="flex w-full gap-3.75">
      <input
        type="text"
        className="w-full text-gray2 text-headline font-semibold px-4 py-2 border border-main rounded-7.5 focus:outline-none focus:border-main"
        value={value}
        onChange={onChange}
        onKeyPress={handleKeyPress}
      />
      <Button text="등록" color="PURPLE" size="small" onClick={onClick} />
    </div>
  )
}

export default ChattingInput
