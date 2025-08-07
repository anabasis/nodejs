// 작업자 : 최유희

import styles from '@ui/styles/components/form/_input.module.scss'
import React from 'react'

interface InputProps {
  /**
   *  에러 상태 표시
   */
  error?: boolean
  /**
   *  필수값 표시
   */
  required?: boolean
  /**
   *  비활성 상태 표시
   */
  disabled?: boolean

  /**
   *  플레이스홀더 표시
   */
  placeholder?: string
  /**
   * 커스텀 확장 className
   */
  className?: string
  id?: string
  value?: string
  defaultValue?: string

  /**
   *  인풋 도움말 표시
   */
  msg?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  children?: React.ReactNode
  /**
   * size: 'xs : height 28px' | 'sm' | 'md' | 'lg'
   * */
  size?: 'lg' | 'md' | 'sm' | 'xs' | undefined

  /**
   * innerBoxSize: full width 100% | undefined
   * */
  innerBoxSize?: 'full' | undefined
  list?: string
  autoComplete?: string
  name?: string
}

export const RefInput = React.forwardRef(({ onChange, ...rest }: InputProps, inputRef: React.Ref<HTMLInputElement>) => {
  const { error, size, innerBoxSize, className, placeholder, children } = rest

  return (
    <div className={[styles['ipt_box_inner'], styles[innerBoxSize ? innerBoxSize : '']].join(' ')}>
      <input
        ref={inputRef}
        className={[styles['ipt_field'], styles[error ? 'error' : ''], styles[size || ''], className ? styles[className] : ''].join(' ')}
        onChange={onChange}
        type="text"
        placeholder={placeholder}
      />
      {children}
    </div>
  )
})

export default RefInput
RefInput.displayName = 'RefInput'
