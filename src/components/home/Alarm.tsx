import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  useAlarmList,
  usePatchAlarmAll,
  usePatchAlarm,
  useDeleteAlarmAll,
  useDeleteAlarm,
} from '@/service/alarm/useAlarmService'
import { AlarmI } from '@/model/Alarm'

interface AlarmProps {
  closeAlarmPopup: () => void
}

const Alarm = ({ closeAlarmPopup }: AlarmProps) => {
  const router = useRouter()
  const { data: alarmList, refetch } = useAlarmList(0, 50)
  const { mutate: patchAlarm } = usePatchAlarm()

  const { mutate: patchAlarmAll } = usePatchAlarmAll()
  const { mutate: deleteAlarm } = useDeleteAlarm()
  const { mutate: deleteAlarmAll } = useDeleteAlarmAll()

  const handleMarkAllAsRead = () => {
    patchAlarmAll(
      {},
      {
        onSuccess: () => {
          refetch()
        },
      },
    )
  }

  const handleDeleteAll = () => {
    deleteAlarmAll(
      {},
      {
        onSuccess: () => {
          refetch()
          closeAlarmPopup()
        },
      },
    )
  }

  const handleDeleteAlarm = (id: number) => {
    deleteAlarm(id, {
      onSuccess: () => {
        refetch()
      },
    })
  }

  /* 알람을 읽고 해당 경로로 이동 */
  const handleMarkAsReadAndNavigate = async (alarm: AlarmI) => {
    await patchAlarm(alarm.id, {
      onSuccess: () => {
        refetch()
      },
    })

    let targetPath = '/'
    switch (alarm.notificationType) {
      case 'BOARD_COMMENT':
      case 'BOARD_REPLY_OF_COMMENT':
      case 'HOT_BOARD':
        targetPath = `/board/${alarm.resourceId}`
        break
      case 'DISCUSSION_COMMENT':
      case 'DISCUSSION_REPLY_OF_COMMENT':
      case 'HOT_DISCUSSION':
        targetPath = `/discussion/${alarm.resourceId}`
        break
      case 'HOT_TEACHER':
      case 'BADGE':
        targetPath = `/user/${alarm.resourceId}`
        break
      case 'CHAT':
        targetPath = `/chat/${alarm.resourceId}`
        break
      default:
        targetPath = '/'
    }

    closeAlarmPopup()
    router.push(targetPath)
  }

  return (
    <div className="bg-main3 rounded-3.75 shadow-lg w-full p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-headline text-gray2 font-semibold">전체 알림</h2>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleMarkAllAsRead}
            className="text-headline text-gray2 hover:text-main1"
          >
            전체 읽음
          </button>
          <div className="text-headline text-gray2">|</div>
          <button
            type="button"
            onClick={handleDeleteAll}
            className="text-headline text-gray2 hover:text-main1"
          >
            전체 삭제
          </button>
        </div>
      </div>

      <ul className="flex flex-col gap-2.5 max-h-60 overflow-y-auto scrollbar-hide">
        {alarmList?.result.map((alarm: AlarmI) => (
          <li key={alarm.id}>
            <button
              type="button"
              className="bg-white rounded-3.75 px-4 py-4.5 gap-4 cursor-pointer w-full"
              onClick={() => handleMarkAsReadAndNavigate(alarm)}
              style={{ boxShadow: '0px 2px 2px 0px #EFEBF8' }}
            >
              <div className="w-full flex justify-between items-center gap-2">
                <span className="text-body text-gray2">
                  {alarm.notificationTypeContent}
                </span>
                {!alarm.state ? (
                  <Image
                    src="/images/discussion/red_circle.svg"
                    alt="new"
                    width={12}
                    height={12}
                  />
                ) : (
                  <Image
                    src="/images/discussion/delete_btn.svg"
                    alt="new"
                    width={12}
                    height={12}
                    onClick={() => handleDeleteAlarm(alarm.id)}
                  />
                )}
              </div>

              <div className="flex justify-between">
                <p className="text-body text-gray1 font-semibold">
                  {alarm.content}
                </p>
                <span className="text-footnote text-gray3">
                  {alarm.createdAt}
                </span>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Alarm
