// 작업자 : 서혜진

import styles from '@ui/styles/components/form/_radio.module.scss'
import React from 'react'

interface RadioLineBoxProps {
  id?: string
  name?: string
  value?: string
  text?: string
  subText?: string
  defaultChecked?: boolean
  onClick?: () => void
}

export const RadioLineBox = ({ id, name, value, text, subText, defaultChecked, onClick }: RadioLineBoxProps) => {
  return (
    <div className={`${styles.rdo_line_box}`} onClick={onClick}>
      <input type="radio" value={value} name={name} id={id} defaultChecked={defaultChecked} />
      <label htmlFor={id}>
        <i className={`${styles.radio_btn}`}></i>
        <strong className="title2">{text}</strong>
        <span className="body2 typo500 mt_4">{subText}</span>
      </label>
    </div>
  )
}
