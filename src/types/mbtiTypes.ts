type MBTI =
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

// "전체"를 포함한 모든 MBTI 타입 배열
const AllMbtiTypes: (MBTI | '전체')[] = ['전체', ...mbtiTypes]

export { AllMbtiTypes, mbtiTypes, MBTI }
