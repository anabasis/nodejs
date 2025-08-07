// 작업자: 김수연

import { Icons } from '@ui/components/Icons'
import styles from '@ui/styles/components/labels/_label.module.scss'

interface ChipProps {
  children?: React.ReactNode
  size?: 'sm' | 'md'
  className?: string // 예외 케이스 글로벌로 규정
  link?: boolean
  label?: string
  onClick?: () => void
}

export const Chip = ({ children, size, className, link, label, onClick }: ChipProps) => {
  return (
    <>
      <div className={`${styles.chip} ${styles[size || 'md']} ${className || ''}`}>
        {label && <span className={styles.bold}>{label} </span>}
        <span>{children}</span>
        <button className={styles.action} onClick={onClick}>
          {!link ? <Icons.XIcon width={18} height={18} fill="var(--navy800)" /> : <Icons.AngleIcon width={15} height={15} fill="var(--navy800)" />}
        </button>
      </div>
    </>
  )
}
