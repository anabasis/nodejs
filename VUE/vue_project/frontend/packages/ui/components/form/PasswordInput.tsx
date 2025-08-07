// 작업자 : 최유희

import { ChangeEvent, FocusEvent, useState } from 'react'
import { Icons } from '@ui/components/Icons'
import styles from '@ui/styles/components/form/_input.module.scss'

interface InputProps {
  /**
   *  에러 상태 표시
   */
  error?: boolean

  /**
   *  비활성 상태 표시
   */
  disabled?: boolean

  /**
   *  플레이스홀더 표시
   */
  placeholder?: string
  size?: string
  id?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void
}

export const PasswordInput = ({ ...others }: InputProps) => {
  const { error, disabled, id, size, placeholder, onChange, onBlur } = others
  const [showPassword, setShowPassword] = useState(false)
  const onClick = () => {
    setShowPassword(!showPassword)
  }

  return (
    <>
      <div className={styles.ipt_box_inner}>
        <div className={[styles['multi_ipt'], styles[error ? 'error' : ''], styles[size || '']].join(' ')}>
          <input
            className={[styles['ipt_field']].join(' ')}
            type={showPassword ? 'text' : 'password'}
            id={id}
            placeholder={placeholder}
            disabled={disabled}
            onChange={onChange}
            onBlur={onBlur}
          />
          <button onClick={onClick} className={[styles['btn_password']].join(' ')}>
            {showPassword ? <Icons.ShowPasswordIcon /> : <Icons.HidePasswordIcon />}
          </button>
        </div>
      </div>
    </>
  )
}
