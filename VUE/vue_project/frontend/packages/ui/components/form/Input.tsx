// 작업자 : 최유희

import styles from '@ui/styles/components/form/_input.module.scss'
import React from 'react'
import { HTMLInputTypeAttribute } from 'react'

interface InputProps {
  /**
   *  에러 상태 표시
   */
  error?: boolean
  /**
   *  필수값 표시
   */
  //required?: boolean
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
  value?: string | number

  /**
   *  인풋 도움말 표시
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
  children?: React.ReactNode
  /**
   * size: 'xs : height 28px' | 'sm' | 'md' | 'lg'
   * */
  size?: 'lg' | 'md' | 'sm' | 'xs' | undefined

  /**
   * innerBoxSize: full width 100% | undefined
   * */
  innerBoxSize?: 'full' | undefined

  /**
   * isc : input 상태에 따른 컬러 클래스
   **/
  color?: string

  /*
   * 커스텀 UI 스타일
   */
  uiType?: 'no_line' | 'pure_input' | undefined
  list?: string
  dataList?: JSX.Element
  autoComplete?: string
  name?: string
  maxLength?: number
  id?: string
  min?: number
  inputType?: HTMLInputTypeAttribute
}

export const BaseInput = ({ onChange, onBlur, onKeyDown, ...others }: InputProps) => {
  const {
    disabled,
    value,
    children,
    inputType,
    placeholder,
    size,
    error,
    dataList,
    className,
    color,
    min,
    id,
    autoComplete,
    name,
    innerBoxSize,
    uiType,
    maxLength,
  } = others
  return (
    <div className={[styles['ipt_box_inner'], styles[innerBoxSize ? innerBoxSize : '']].join(' ')}>
      <input
        id={id}
        className={[
          styles['ipt_field'],
          styles[error ? 'error' : ''],
          styles[size || ''],
          color ? styles[color] : '',
          uiType ? styles[uiType] : '',
          className,
        ].join(' ')}
        min={min}
        onChange={onChange}
        onBlur={onBlur}
        type={inputType ? inputType : 'text'}
        name={name}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete={autoComplete}
        onKeyDown={onKeyDown}
        maxLength={maxLength}
      />
      {dataList}
      {children}
    </div>
  )
}
