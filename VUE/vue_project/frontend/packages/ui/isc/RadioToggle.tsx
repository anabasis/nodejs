// 작업자 : 최유희

import styles from '@ui/styles/components/form/_radio.module.scss'
import React, { ChangeEvent } from 'react'

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
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

export const RadioToggle = ({ value, name, defaultChecked, disabled, id, text, type, checked, size, onChange }: RadioProps) => {
  return (
    <div className={`${styles.rdo_toggle} ${styles[type || '']} ${styles[size || '']} `}>
      <input type="radio" value={value} name={name} id={id} disabled={disabled} defaultChecked={defaultChecked} checked={checked} onChange={onChange} />
      <label htmlFor={id}>{text}</label>
    </div>
  )
}
