import React from 'react'
import styles from '@ui/styles/components/table/_table.module.scss'

interface MultiTableProps {
  children: React.ReactNode
  type?: string
}

export const MultiTable = ({ children, type }: MultiTableProps) => {
  // 클래스 적용 참고 샘플 케이스 정형화 불가로, children 하드코딩으로 작성해야함

  return (
    <div className={[styles['tbl'], styles['multi'], styles[type ? styles[type] : '']].join(' ')}>
      <table>{children}</table>
    </div>
  )
}
