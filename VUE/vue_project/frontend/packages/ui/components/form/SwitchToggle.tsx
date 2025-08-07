// 작업자 : 최유희
// front : 신은주
import { ChangeEvent } from 'react'
import styles from '@ui/styles/components/form/_checkbox.module.scss'

interface CheckProps {
  onClick?: () => void
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  id?: string
  color?: 'primary' | undefined
  value?: boolean
  text?: string
  textPosition?: 'left' | null
  disabled?: boolean
  className?: string | undefined
}

export const SwitchToggle = ({ text, textPosition, id, className, color, value, onChange, disabled }: CheckProps) => {
  return (
    <>
      <div className={[styles['toggle'], styles[color || ''], styles[textPosition === 'left' ? 'reverse' : ''], className].join(' ')}>
        <input type="checkbox" id={id} checked={value} onChange={onChange} disabled={disabled} />
        <label htmlFor={id} className={styles.toggleSwitch}>
          <span className={styles.toggleButton}></span>
        </label>
        {text && <span className={styles.toggleText}>{text}</span>}
      </div>
    </>
  )
}
