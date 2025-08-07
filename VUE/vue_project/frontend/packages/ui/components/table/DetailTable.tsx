// 작업자 : 김수연

import styles from '@ui/styles/components/table/_table.module.scss'

interface DetailTableProps {
  children: React.ReactNode
  colgroup?: React.ReactNode
  className?: string
}

export const DetailTable = ({ colgroup, className, children }: DetailTableProps) => {
  // 클래스 적용 참고 샘플 케이스. 정형화 불가로 children 하드코딩으로 작성해야함
  return (
    <div className={[styles['tbl'], styles['detail'], className ? className : ''].join(' ')}>
      <table>
        {colgroup}
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}
