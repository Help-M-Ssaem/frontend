'use client'

const TextareaTheme = {
  color: {
    gray: 'text-gray2',
  },
  size: {
    large: 'px-7.5 py-5 text-headline', // 이용약관
  },
}

type Color = keyof typeof TextareaTheme.color
type Size = keyof typeof TextareaTheme.size

export interface TextareaProps {
  value: string
  color: Color
  size: Size
}

const Textarea = ({ value, color, size }: TextareaProps) => (
  <textarea
    className={`bg-white border-gray6 border-2 rounded-3.75 w-full h-44 ${TextareaTheme.color[color]} ${TextareaTheme.size[size]} scrollbar-hide resize-none`}
    value={value}
    readOnly
    onFocus={(e) => e.target.blur()}
  />
)

export default Textarea
