// 작업자: 김수연

import React from 'react'
import styles from '@ui/styles/components/table/_table.module.scss'

interface TableProps {
  children: React.ReactNode
}

export const HistoryTable = ({ children }: TableProps) => {
  // 클래스 적용 참고 샘플 케이스 정형화 불가로, children 하드코딩으로 작성해야함

  return (
    <div className={`${styles.tbl} ${styles.history}`}>
      <table>{children}</table>
    </div>
  )
}
