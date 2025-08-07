// 작업자 : 김수연

import styles from '@ui/styles/components/labels/_label.module.scss'

interface BadgeProps {
  children?: React.ReactNode
  //기존 타입이 badge = solid , action = line
  uiType?: 'solid' | 'line'
  style?: 'square' | 'round' | 'count' | 'ods'
  color?: string
  //disabled
  disabled?: boolean
  //size
  size?: 'thin' | 'sm' | 'md'
  className?: string // 예외 케이스 글로벌로 규정
}

export const Badge = ({ children, ...others }: BadgeProps) => {
  const { uiType, disabled, style, color, size, className } = others
  const colorVal = (color || '').toLowerCase()

  return (
    <span
      className={`${styles.badge} ${styles[uiType || 'line']} ${styles[style || 'square']} ${styles[size || 'sm']} ${styles[colorVal || 'blue']} ${
        disabled && styles.disabled
      } ${className}`}
    >
      {children}
    </span>
  )
}
