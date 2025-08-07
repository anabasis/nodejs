// 작업자: 최유희
// multiplex table 에 드래그되어 들어가는 analyte item 컴포넌트

import React from 'react'
import styles from '@ui/styles/components/table/_table.module.scss'
import { Icons } from '@ui/components'

interface DragItemProps {
  children: React.ReactNode
  draggable?: boolean // 드래그 시 ui 효과
  deleteBtn?: boolean // 삭제버튼 유무
  deleteClick?: () => void // 삭제버튼 클릭 콜백
}

export const DragItem = ({ children, draggable, deleteBtn, deleteClick }: DragItemProps) => {
  return (
    <div className={`${styles.analyte_item} ${draggable ? styles.draggable : ''} `} draggable={draggable}>
      {/* 노출되는 시점이 모호하여 태그로 분리 */}
      {draggable && (
        <i className={styles.plus_ico}>
          <Icons.PlusIcon width={8} height={8} fill="#fff" />
        </i>
      )}
      {children}
      {deleteBtn && (
        <button className={styles.bth_delete} onClick={deleteClick}>
          <Icons.XIcon width={12} height={12} fill="#fff" />
        </button>
      )}
    </div>
  )
}
