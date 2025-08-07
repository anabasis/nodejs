// 작업자 : 최유희

import { ChangeEvent } from 'react'
import styles from '@ui/styles/components/form/_checkbox.module.scss'

interface CheckProps {
  names?: string
  id?: string
  name?: string
  index?: number
  labelText?: string
  /**
   *  disabled: true/false
   */
  disabled?: boolean
  /**
   *  disabled: true/false
   */
  defaultChecked?: boolean
  /**
   *  사이즈 정의 :: xs(20*20) / sm (24*24) / md (36*36) / lg (40*40)
   */
  size?: 'xs' | 'sm' | 'md' | 'lg'
  /**
   * 커스텀 확장 className
   */
  className?: any
  color?: string // [isc] 상태별 컬러 추가
  value?: boolean
  labelHide?: boolean
  uiType?: 'round' | undefined
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Checkbox = ({ ...others }: CheckProps) => {
  const { size, labelText, id, name, disabled, color, defaultChecked, className, value, labelHide, uiType, onChange, onClick } = others
  const classNames = typeof className === 'object' ? className.length > 0 && className.map((v: string) => styles[v]).join(' ') : className
  const labelHideClass = labelHide ? `${styles.chkbox_label} ${styles.label_hide}` : `${styles.chkbox_label}`
  return (
    <div className={`${styles.chkbox} ${styles[uiType || '']} ${styles[size || 'sm']} ${styles[color ? color : '']}  ${classNames}`} key={id}>
      <input className={styles.chkbox_input} type="checkbox" name={name} id={id} disabled={disabled} checked={value} onChange={onChange} onClick={onClick} />
      <label htmlFor={id} className={`${labelHideClass} ${disabled ? '' : 'cursor_p'}`}>
        {labelText}
      </label>
    </div>
  )
}
