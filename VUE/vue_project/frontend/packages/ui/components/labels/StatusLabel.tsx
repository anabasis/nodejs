// 작업자: 김수연

import React from 'react' // React import 추가
import { IscIcons } from '@ui/isc'
import styles from '@ui/styles/components/labels/_label.module.scss'

interface LabelProps {
  children?: React.ReactNode
  // size?: 'sm' | 'md'
  className?: string | null // 예외 케이스 글로벌로 규정
  /**
   * 'circle' | 'square' | 'icon'
   */
  type?: 'circle' | 'square' | 'icon'
  /**
   * circle, square + status: 상태에 따른 컬러 반영 (디자인 상태명 그대로 따름 ex: done, success, error)
   * icon + status: [인실리코] 상태에 따른 아이콘 반영
   */
  status?: string
}

export const StatusLabel = ({ children, ...others }: LabelProps) => {
  const { className, type, status } = others
  const statusColor = status?.toLowerCase() // 상태 문자열을 소문자로 변환하여 비교
  // 상태에 따른 아이콘 컴포넌트를 반환하는 함수
  const IconComponent = () => {
    switch (
      status?.toLowerCase() // 상태 문자열을 소문자로 변환하여 비교
    ) {
      case 'running':
        return <IscIcons.Running />
      case 'ready':
        return <IscIcons.Ready />
      case 'stop':
      case 'stopped':
      case 'canceled':
      case 'pasuse':
        return <IscIcons.Stopped />
      case 'done':
        return <IscIcons.Done />
      case 'error':
        return <IscIcons.Error />
      case 'copying':
        return <IscIcons.Copying />
      case 'fail':
        return <IscIcons.Fail />
      case 'waiting':
        return <IscIcons.Waiting />
      case 'onhold':
        return <IscIcons.OnHold />
      case 'uploading':
        return <IscIcons.Running />
      default:
        return null // 지원하지 않는 상태일 경우 아무것도 반환하지 않음
    }
  }

  return (
    <p className={`${styles.label} ${type ? styles[type] : styles.circle} ${className} `}>
      {type === 'icon' ? <i> {IconComponent()} </i> : <i className={`${styles[statusColor || 'done']}`}></i>}
      <span>{children}</span>
    </p>
  )
}
