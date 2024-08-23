'use client'

const mbtiColors = {
  ENFP: 'bg-enfp',
  ENFJ: 'bg-enfj',
  INFP: 'bg-infp',
  INFJ: 'bg-infj',
  INTJ: 'bg-intj',
  INTP: 'bg-intp',
  ENTJ: 'bg-entj',
  ENTP: 'bg-entp',
  ISTP: 'bg-istp',
  ISFP: 'bg-isfp',
  ESTP: 'bg-estp',
  ESFP: 'bg-esfp',
  ISTJ: 'bg-istj',
  ISFJ: 'bg-isfj',
  ESTJ: 'bg-estj',
  ESFJ: 'bg-esfj',
}

const extraColors = {
  PURPLE: 'bg-main2',
  LIGHTPURPLE: 'bg-main',
  GREEN: 'bg-green',
  GRAY: 'bg-gray3',
  NEWBIE: 'bg-newbie',
  MBTMI: 'bg-mbtmi',
  FUNFUN: 'bg-funfun',
}

const buttonTheme = {
  color: {
    ...mbtiColors,
    ...extraColors,
  },
  size: {
    small: 'px-8.75 py-2 rounded-3xl text-body font-bold',
    medium: 'px-5 py-2.5 rounded-3xl text-title3 font-bold',
    large: 'px-8.75 py-2.5 rounded-3xl text-title3 font-bold',
    login: 'py-3 max-w-95 w-full rounded-2xl text-body font-regular',
    badge:
      'px-2.5 py-0.75 rounded-3xl text-caption sm:text-footnote font-regular',
  },
}

export type MBTI = keyof typeof mbtiColors
export type Extr = keyof typeof extraColors
export type Color = MBTI | Extr | '엠비티어른' | '엠비티라노'
export type Size = keyof typeof buttonTheme.size

export interface ButtonProps {
  text: string
  size: Size
  color?: Color
  onClick?: () => void
  disabled?: boolean
  className?: string
}

const Button = ({
  text,
  size,
  color = 'GREEN',
  onClick,
  disabled,
  className,
}: ButtonProps) => {
  let colorClass

  const normalizedColor =
    typeof color === 'string' ? color.toUpperCase() : color

  if (normalizedColor === '엠비티어른') {
    colorClass = 'bg-mbtiadult'
  } else if (normalizedColor === '엠비티라노') {
    colorClass = 'bg-mbtilano'
  } else {
    colorClass =
      buttonTheme.color[normalizedColor as keyof typeof buttonTheme.color]
  }

  return (
    <button
      type="button"
      className={`text-white ${buttonTheme.size[size]} ${colorClass} whitespace-nowrap ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  )
}

Button.defaultProps = {
  color: 'green',
  onClick: undefined,
  disabled: false,
  className: '',
}

export default Button
