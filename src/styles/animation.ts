export const ContainerAnimation = {
  hidden: { y: 2, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
}

export const FadeInAnimation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
  },
}

export const RealtimeKeywordAnimation = (idx: number) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: idx * 0.1 },
  },
})
