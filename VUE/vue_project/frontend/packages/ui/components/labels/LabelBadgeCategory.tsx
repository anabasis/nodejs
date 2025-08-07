// 작업자 : 김수연

import styles from '@ui/styles/components/labels/_labels.module.scss'

interface LabelProps {
  children?: React.ReactNode

  type?: 'square' | 'round'

  //기존 타입이 badge = solid , action = line
  style?: 'solid' | 'line'

  color?: string
  //disabled
  disabled?: 'disabled'

  size?: 'sm' | 'md' | 'lg'

  title?: string

  lefttext?: boolean
  className?: string // 예외 케이스 글로벌로 규정
}

export const LabelBadgeCategory = ({ children, ...others }: LabelProps) => {
  const { type, disabled, title, lefttext, style, color, size, className } = others
  // const [completed, setCompleted] = useState(false)
  const labelSize = type === 'round' ? styles[size || 'md'] : ''

  return (
    <>
      {lefttext && children && <p className={`${styles.badge_desc} ${disabled ? styles.disabled : ''}`}>{title}</p>}
      <span
        className={`${styles.label} 
        ${styles.badge} ${styles[type || 'square']} 
        ${styles[style || 'line']} ${styles[color || 'primary']} 
        ${disabled ? styles.disabled : ''} ${labelSize} ${className}`}
      >
        {children}
      </span>
      {!lefttext && children && <p className={`${styles.badge_desc} ${disabled ? styles.disabled : ''}`}>{title}</p>}
    </>
  )
}
