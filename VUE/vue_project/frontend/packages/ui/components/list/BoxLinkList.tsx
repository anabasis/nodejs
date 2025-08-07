// 작업자 : 최유희
// front : 신은주
// 통합 설정에만 쓰이는 UI 컴포넌트라 스토리엔 추가하지 않음, 필요시 업데이트 예정

import styles from '@ui/styles/components/list/_list.module.scss'

import React from 'react'

interface ListProps {
  /**
   *  박스 리스트 UI
   */
  align?: 'left' | 'right' | 'top' | 'bottom' | undefined
  children: React.ReactNode
}

export const BoxLinkList = ({ align, children }: ListProps) => {
  return <ul className={[styles['boxlink_list'], styles[align || '']].join(' ')}>{children}</ul>
}
