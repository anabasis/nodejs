// 작업자: 김병기

import { useState } from 'react'
import styles from '@ui/styles/components/labels/_labels.module.scss'
import { ClassNames } from '@emotion/react'

interface LabelProps {
  children: React.ReactNode
  className?: string
  color?: 'primary' | ''
}

export const LabelBadgeCount = ({ ...others }: LabelProps) => {
  const { children, color, className } = others
  // const [completed, setCompleted] = useState(false);

  return <span className={`${styles.label_bage_count} ${styles[color || '']} ${className}`}>{children}</span>
}
