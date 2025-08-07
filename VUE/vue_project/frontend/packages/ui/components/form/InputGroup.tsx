// 작업자 : 최유희

import styles from '@ui/styles/components/form/_input.module.scss'
import React from 'react'

interface InputProps {
  error?: boolean
  align?: 'inline' | undefined //align 속성 추가 2023.07.04
  children?: React.ReactNode
  className?: string
}

export const InputGroup = ({ ...others }: InputProps) => {
  const { error, align, children, className } = others
  return (
    <>
      <div className={[styles['ipt_box'], styles[error ? 'error' : ''], styles[align || ''], className].join(' ')}>{children}</div>
      {/* <div className={[styles['ipt_box'], error ? styles['error'] : '', align === 'inline' ? styles['inline'] : ''].join(' ')}>
        {align === 'inline' ? children : <div className="align start">{children}</div>}
      </div> */}
    </>
  )
}
