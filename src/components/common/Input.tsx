'use client'

const InputTheme = {
  color: {
    gray: 'border-gray4 text-maindark',
    purple: 'border-main text-maindark',
  },
  size: {
    medium: 'p-4 text-headline rounded-3.75 border-2', // 닉네임
    large: 'px-5 py-4 text-headline rounded-7.5 font-bold border-1', // 댓글
  },
}

type Color = keyof typeof InputTheme.color
type Size = keyof typeof InputTheme.size

export interface InputProps {
  value: string
  placeholder?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  color: Color
  size: Size
  type?: string
}

const Input = ({
  value,
  placeholder,
  onChange,
  color,
  size,
  type,
}: InputProps) => (
  <input
    className={`bg-white w-full ${InputTheme.color[color]} ${InputTheme.size[size]} focus:outline-none`}
    value={value}
    placeholder={placeholder}
    onChange={onChange}
    type={type}
  />
)

Input.defaultProps = {
  placeholder: '',
  type: 'text',
}

export default Input
