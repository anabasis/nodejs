// 작업자: 최유희
import { useState } from 'react'
import styles from '@ui/styles/components/labels/_labels.module.scss'

interface LabelProps {
  children: React.ReactNode
  className?: string
  type?: 'square' | 'round'
  color?: string
  status?: 'done' | 'ongoing' | 'pause' | 'normal' | string
}

export const LabelBadgeStatus = ({ children, status, className, type, color }: LabelProps) => {
  return (
    <span className={`${styles.label_bullet} ${status ? styles.status : ''} ${className}`}>
      <i className={`${styles.bullet} ${styles[status || 'nor']} ${styles[type || 'round']} ${color} `}></i>
      {children}
    </span>
  )
}
