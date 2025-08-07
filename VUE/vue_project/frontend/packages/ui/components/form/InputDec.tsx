// 작업자 : 최유희

import styles from '@ui/styles/components/form/_input.module.scss'
import React from 'react'

interface Props {
  /**
   *  에러 상태 표시
   */
  error?: boolean
  /**
   * 메세지 표시
   */
  msg?: string
  /**
   * 성공 상태 표시
   */
  success?: boolean
}

export const InputDec = ({ ...others }: Props) => {
  const { error, msg, success } = others
  return <p className={[styles['ipt_dec'], styles[error ? 'error' : ''], styles[success ? 'success' : '']].join(' ')}>{msg}</p>
}
