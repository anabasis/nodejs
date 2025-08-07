// 작업자 : 최유희

import styles from '@ui/styles/components/form/_input.module.scss'
import React from 'react'

interface LabelProps {
  labelText?: string
  required?: boolean
  id?: string
  children?: React.ReactNode
  className?: string | undefined
  // 현재 정의된 라벨 스타일 클래스는 'light' 입니다.
  textcolor?: string
  labelChildren?: React.ReactNode
}

export const InputLabel = ({ ...others }: LabelProps) => {
  const { required, id, labelText, children, textcolor, className } = others
  return (
    <>
      <label htmlFor={id} className={`${styles.ipt_label} ${className ? className : ''}`}>
        <span className={[styles[textcolor || ''], textcolor ?? textcolor].join(' ')}>{labelText}</span>
        {required ? <span className={[styles['ico_required']].join(' ')}>*</span> : ''}
        {children}
      </label>
    </>
  )
}
