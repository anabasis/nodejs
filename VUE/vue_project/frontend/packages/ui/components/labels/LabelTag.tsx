// 작업자 : 김병기

import { useState } from 'react'
import styles from '@ui/styles/components/labels/_labels.module.scss'

interface LabelProps {
  /**
   *  스텝명
   */
  title?: string
  /**
   *  스텝 부가 설명이 필요한 경우
   */
  txt?: string

  children?: React.ReactNode
  type?: string
  txtcolor?: string
}

export const LabelTag = ({ children, ...others }: LabelProps) => {
  const { type, title, txtcolor } = others
  // const [completed, setCompleted] = useState(false)
  return (
    <>
      <span className={`${styles.label} ${styles.tag} ${type ? styles[type] : ''} ${txtcolor ? styles[txtcolor] : ''}`}>
        <em>{title}</em>
        {children && children}
      </span>
    </>
  )
}
