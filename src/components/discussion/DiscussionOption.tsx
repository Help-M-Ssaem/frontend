'use client'

import { DiscussionOptionI } from '@/model/Discussion'
import React from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import { usePostDiscussionPraticipation } from '@/service/discussion/useDiscussionService'

const DiscussionOptionTheme = {
  size: {
    small: 'min-h-30', // home
    large: 'min-h-54', // discussion
  },
}

export interface DiscussionOptionProps {
  discussionOption: DiscussionOptionI
  size: keyof typeof DiscussionOptionTheme.size
  boardId: number
}

const DiscussionOption = ({
  discussionOption,
  size,
  boardId,
}: DiscussionOptionProps) => {
  const { content, imgUrl, disabled, selectedPercent, selected } =
    discussionOption

  const { mutate } = usePostDiscussionPraticipation()

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation()

    mutate({
      discussionId: boardId,
      discussionOptionId: discussionOption.id,
    })
  }

  return (
    <button
      type="submit"
      className={clsx(
        'flex flex-col justify-center items-center border-gray4 border-1 rounded-7.5 gap-2.5 p-4 text-center w-full min-h-30 sm:min-h-54',
        DiscussionOptionTheme.size[size],
        {
          'bg-main2 text-white': selected,
          'bg-white text-black': !selected,
        },
      )}
      onClick={handleClick}
      disabled={disabled}
    >
      {!selected && imgUrl && (
        <Image src={imgUrl} alt="thumbnail" width={175} height={175} />
      )}
      <div>
        <p
          className={clsx('flex flex-col gap-3', 'text-body font-regular', {
            'text-body sm:text-title2 font-bold': selected || !imgUrl,
          })}
        >
          {content}
        </p>
        {selected && <p className="text-title2">{selectedPercent}%</p>}
      </div>
    </button>
  )
}

export default DiscussionOption
