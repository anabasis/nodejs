// 작업자 : 최유희

import styles from '@ui/styles/components/form/_radio.module.scss'
import { ChangeEvent, MouseEventHandler } from 'react'

interface RadioProps {
  disabled?: boolean
  defaultValue?: string
  value?: string
  group?: string
  defaultChecked?: boolean
  text?: string
  name?: string
  id?: string
  type?: string
  checked?: boolean
  size?: string
  color?: string // [isc] 상태별 컬러 추가
  className?: string //글로벌 클래스 바인딩
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  onClick?: MouseEventHandler<HTMLInputElement>
}

export const RadioBox = ({ value, className, name, defaultChecked, disabled, id, text, type, color, checked, size, onChange, onClick }: RadioProps) => {
  return (
    <div className={`${styles.rdo_box} ${styles[type || '']} ${styles[size || '']} ${styles[color ? color : '']} ${className}`}>
      <input
        type="radio"
        value={value}
        name={name}
        id={id}
        disabled={disabled}
        defaultChecked={defaultChecked}
        checked={checked}
        onChange={onChange}
        onClick={onClick}
      />
      <label htmlFor={id}>{text}</label>
    </div>
  )
}
