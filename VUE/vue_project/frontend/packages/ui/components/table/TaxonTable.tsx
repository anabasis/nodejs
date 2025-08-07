import React from 'react'
import styles from '@ui/styles/components/table/_table.module.scss'

interface TaxonTableProps {
  children: React.ReactNode
  inner?: boolean
  height?: number
  className?: string // 글로벌 클래스 바인딩
  uiType?: any | undefined // 모듈 클래스 바인딩
  style?: React.CSSProperties // 인라인 스타일 바인딩 (예외케이스 작성시)
}

export const TaxonTable = ({ uiType, style, className, children, inner, height }: TaxonTableProps) => {
  // 클래스 적용 참고 샘플 케이스 정형화 불가로, children 하드코딩으로 작성해야함
  const uiTypes = typeof uiType === 'object' ? uiType.length > 0 && uiType.map((v: string) => styles[v]).join(' ') : styles[uiType]

  return (
    <div
      className={`${styles['tbl']} ${styles['taxon']} ${inner ? styles['inner'] : ''} ${height ? styles['scroll'] : ''} ${uiTypes} ${className} `}
      style={style}
      // 글로벌 클래스로 height 받도록 변경
      // style={{ maxHeight: `${height}px` }}
    >
      <table>{children}</table>
    </div>
  )
}
