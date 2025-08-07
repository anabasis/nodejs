import React from 'react'
import styles from '@ui/styles/components/table/_grid.module.scss'

interface GridTableContainerProps {
  className?: string
  children?: React.ReactNode
  height?: number
}

export const GridTableContainer = ({ className, height, children }: GridTableContainerProps) => {
  return (
    <div
      style={{ height: height ? `${height}px` : 'auto' }}
      className={[styles['grid_table_container'], styles[className ? className : ''], className].join(' ')}
    >
      <div className={`${styles.inner} ${styles[height ? 'scroll' : '']}`}>{children}</div>
    </div>
  )
}
