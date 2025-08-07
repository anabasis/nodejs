'use client'

import styles from '@ui/styles/common/_header.module.scss'
import { useEffect, useState, useCallback } from 'react'
import { groupBy as _groupBy, has as _has, map as _map } from 'lodash-es'
import { format, differenceInMinutes, differenceInDays } from 'date-fns'
import { useQuery } from '@tanstack/react-query'
import { getNotificationList, postNotificationList } from 'library/api/common'
import { NotificationItem, NotificationList } from 'library/type/common'
import { changeTimeLocal } from 'library/util'
import { PopoverMui } from '@ui/index'
import { SearchPop, NotificationPop } from '@ui/components'
import MenuGnb from '@ui/components/header/MenuGnb'

export const Header = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [current, setCurrent] = useState('')
  const [anchorPosition, setAnchorPosition] = useState<{ left: number; top: number }>()
  const [isNewNoti, setIsNewNoti] = useState(false)
  const [notiList, setNotiList] = useState<NotificationList>({})

  const {
    data: notifies,
    isSuccess,
    refetch,
  } = useQuery<NotificationItem[]>(['notifies'], getNotificationList, {
    refetchInterval: 3e5,
    refetchOnWindowFocus: true,
  })

  const handleClick = (tgt: HTMLButtonElement, current: string) => {
    const pos = tgt.getBoundingClientRect()

    setAnchorEl(tgt)
    setCurrent(current)
    setAnchorPosition({ left: pos.left, top: pos.bottom })
  }

  const handleClose = (current: string) => {
    setAnchorEl(null)
    setCurrent('')
    if (current === 'noti') {
      postNotificationList()
      setIsNewNoti(false)
      refetch()
    }
  }

  const formatNotiTime = (dateTime: string): string => {
    const date = new Date(changeTimeLocal({ time: dateTime }))
    const now = new Date()

    const agoDay = differenceInDays(date, now)
    const agoMinute = differenceInMinutes(date, now)

    if (agoDay < -6) {
      return format(date, 'yyyy-MM-dd')
    } else if (agoDay < 0) {
      return `${-agoDay} days ago`
    } else if (agoMinute < -60) {
      // const hours = Math.floor(-agoMinute / 60)
      // const minutes = -agoMinute % 60
      // return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
      return format(date, 'HH:mm')
    } else {
      return `${-agoMinute} min ago`
    }
  }

  const setNotiData = useCallback((list: NotificationItem[]) => {
    const transList = _map(list, (obj: NotificationItem) => ({ ...obj, notificationDate: formatNotiTime(obj.notificationDate) }))
    const groupItems = _groupBy(transList, 'readYn')

    setNotiList(groupItems)
    setIsNewNoti(_has(groupItems, 'N'))
  }, [])

  useEffect(() => {
    if (isSuccess && notifies.length > 0) {
      setNotiData(notifies)
    } else {
      setNotiList({})
    }
  }, [notifies, isSuccess, setNotiData])

  return (
    <header className={styles.header}>
      <MenuGnb onSetItem={handleClick} isNewNoti={isNewNoti} activePop={current} />
      <PopoverMui
        anchorEl={anchorEl}
        transparent={true}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        shadows={current === 'search' ? 'none' : '0px 4px 20px 0px rgba(53, 65, 101, 0.10);'}
        margin="10px 0 0 50px"
        handleClose={() => handleClose(current)}
        anchorPosition={anchorPosition}
      >
        {current === 'search' && <SearchPop />}
        {current === 'noti' && <NotificationPop notiList={notiList} />}
      </PopoverMui>
    </header>
  )
}

export default Header
