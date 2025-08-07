// 작업자 : 김수연
import { ChangeEvent, LegacyRef } from 'react'
import styles from '@ui/styles/components/form/_checkbox.module.scss'

interface CheckProps {
  children?: React.ReactNode
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  id?: string
  //color?: 'primary' | undefined
  value?: boolean
  className?: string | undefined
  disabled?: boolean
}

export const TextToggle = ({ id, value, children, className, onChange, disabled }: CheckProps) => {
  return (
    <>
      <div className={`${styles.txt_toggle} ${className ? styles[className] : ''}`}>
        <input type="checkbox" id={id} checked={value} onChange={onChange} disabled={disabled} />
        <label htmlFor={id} className={styles.toggleButton}>
          {/* {className === 'round' ? <IscIcons.RoundCheck fill="var(--blue400)" /> : ''} */}
          {children}
        </label>
      </div>
    </>
  )
}
