// 작업자 : 김수연
'use client'

import styles from '@ui/styles/components/table/_table.module.scss'

interface BoardTableProps {
  children: React.ReactNode
  style?: React.CSSProperties
  inner?: boolean
  className?: string
  uiType?: string //auto-layout , 기본 : fixed-layout
}

export const BoardTable = ({ style, children, inner, className, uiType }: BoardTableProps) => {
  // 클래스 적용 참고 샘플 케이스 정형화 불가로, children 하드코딩으로 작성해야함

  return (
    <div className={`${styles.tbl} ${styles.board} ${className ? className : ''} ${inner ? styles.inner : ''} ${styles[uiType ? uiType : '']}`} style={style}>
      <table>{children}</table>
      {/* 
          children 샘플 
        <colgroup>
            <col style={{ width: 'auto' }} />
            <col style={{ width: 'auto' }} />
            <col style={{ width: 'auto' }} />
            <col style={{ width: 'auto' }} />
            <col style={{ width: 'auto' }} />
            <col style={{ width: 'auto' }} />
            <col style={{ width: '14px' }} />
          </colgroup>
          <thead>
            <tr>
              <th>label1</th>
              <th>label2</th>
              <th>label3</th>
              <th>label4</th>
              <th>label5</th>
              <th>label6</th>
           </tr>
           </thead>
           <tbody>
           <tr>
              <td><span className="highlight">body1</span></td>
              <td>body2</td>
              <td>body3</td>
              <td>body4</td>
              <td>body5</td>
              <td>body6</td>
            </tr>
           
           */}
    </div>
  )
}
