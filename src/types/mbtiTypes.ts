export type MBTI =
  | 'ENFP'
  | 'ENFJ'
  | 'INFP'
  | 'INFJ'
  | 'INTJ'
  | 'INTP'
  | 'ENTJ'
  | 'ENTP'
  | 'ISTP'
  | 'ISFP'
  | 'ESTP'
  | 'ESFP'
  | 'ISTJ'
  | 'ISFJ'
  | 'ESTJ'
  | 'ESFJ'

const mbtiTypes: MBTI[] = [
  'ENFP',
  'ENFJ',
  'INFP',
  'INFJ',
  'INTJ',
  'INTP',
  'ENTJ',
  'ENTP',
  'ISTP',
  'ISFP',
  'ESTP',
  'ESFP',
  'ISTJ',
  'ISFJ',
  'ESTJ',
  'ESFJ',
]

const AllMbtiTypes: (MBTI | '전체')[] = ['전체', ...mbtiTypes]

export { AllMbtiTypes, mbtiTypes }
