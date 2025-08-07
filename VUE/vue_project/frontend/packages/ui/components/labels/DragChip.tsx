// 작업자 : 김수연

import { Icons } from '@ui/components/Icons'
import styles from '@ui/styles/components/labels/_label.module.scss'

interface ChipProps {
  children?: React.ReactNode
  className?: string // 예외 케이스 글로벌로 규정
  drag?: boolean // false면 기본 ,true면 드래그 중
  onClick?: () => void
}

export const DragChip = ({ children, drag, ...others }: ChipProps) => {
  const { className, onClick } = others

  return (
    <div className={`${styles.drag_chip} ${drag ? styles.drag : ''} ${className}`}>
      <button className={styles.move}>드래그영역</button>
      {children}
      <button className={`${styles.delete_btn}`} onClick={onClick}>
        <Icons.XIcon fill="var(--bg-f)" />
      </button>
    </div>
  )
}
