// 작업자 : 최유희
import { IscIcons } from '@ui/isc/Icons'
import styles from '@ui/styles/isc/_button.module.scss'
import React from 'react'

type StatusType = 'Ready' | 'Running' | 'Stopped' | 'Copying' | 'Done' | 'Fail' | 'Error' | 'Waiting' | 'OnHold'

type NotiStatusType = 'doneNoti' | 'failNoti'

interface StatusBtnProps {
  /**
   *  수정되었을 때, 불렛 생성
   */

  uplExistYn?: boolean
  /**
   *  아이콘 및 버튼 텍스트가 함께 설정됩니다 (수정 필요시 요청,,)
   */
  status: StatusType | NotiStatusType
}

const notiObj = {
  failNoti: 'Fail',
  doneNoti: 'Done',
} as { [key in string]: StatusType }

export const StatusBtn = ({ status, uplExistYn = false }: StatusBtnProps) => {
  const [isView, isBullet] = [(!uplExistYn && status === 'Ready') || status !== 'Ready', ['failNoti', 'doneNoti'].includes(status)]

  const renderIcon = () => {
    if (!status) return
    /* 노티일때  */
    if (['failNoti', 'doneNoti'].includes(status)) {
      const state = notiObj[status as StatusType]

      return React.createElement(IscIcons[state]) || null
    }
    return React.createElement(IscIcons[status as StatusType]) || null
  }

  return (
    <>
      {status && isView && (
        <div className={styles.status_btn}>
          {renderIcon()}
          {/* 수정이 진행되었을때 뜨는 아이콘.. */}
          {isBullet && <i className={styles.bullet}></i>}
          <span className={styles.status_txt}>{isBullet ? notiObj?.[status] : status === 'OnHold' ? 'On hold' : status}</span>
        </div>
      )}
    </>
  )
}
