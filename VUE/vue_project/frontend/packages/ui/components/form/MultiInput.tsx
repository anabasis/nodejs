// 작업자 : 최유희
// 기존 signInput , TypeInput 을 합쳐서 만든 컴포넌트입니다.
// children 을 통해 버튼, 텍스트 등을 넣어서 사용 가능합니다.
// 스토리북의 케이스 참고 부탁드립니다. signInput , TypeInput는 삭제 예정입니다.

import { ChangeEvent, forwardRef } from 'react'
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
  id?: string

  children?: React.ReactNode

  /**
   * className: 글로벌 클래스만 받습니다
   * */
  className?: string | undefined

  /**
   * size: 'xs : height 28px' | 'sm' | 'md' | 'lg'
   * */
  size?: 'lg' | 'md' | 'sm' | 'xs' | undefined //full (default) | lg | sm | md

  /**
   * InnerBoxSize: full width 100% | undefined
   * */
  innerBoxSize?: 'full' | undefined

  /**
   * color : isc input 상태에 따른 컬러 클래스
   **/
  color?: string

  /*
   * uiType : 커스텀 UI 스타일
   */
  uiType?: any | undefined
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  name?: string
  value?: string
  autoComplete?: string
  maxLength?: number
}

export const MultiInput = forwardRef<HTMLInputElement, InputProps>(({ ...others }, ref) => {
  const { error, disabled, id, placeholder, children, size, className, innerBoxSize, onChange, name, color, uiType, value, autoComplete, maxLength } = others

  const uiTypes = typeof uiType === 'object' ? uiType.length > 0 && uiType.map((v: string) => styles[v]).join(' ') : styles[uiType]
  return (
    <div className={`${styles.ipt_box_inner} ${styles[size ? '' : 'flex']} ${styles[innerBoxSize ? innerBoxSize : '']}`}>
      <div
        // className={[
        //   styles.multi_ipt,
        //   styles[error ? 'error' : ''],
        //   styles[disabled ? 'disabled' : ''],
        //   styles[size ? size : ''],
        //   styles[color ? color : ''],
        //   styles[uiType ? uiType : ''],
        //   className,
        // ].join(' ')}
        className={`${styles.multi_ipt} ${styles[error ? 'error' : '']} ${styles[disabled ? 'disabled' : '']} ${styles[size ? size : '']} ${
          styles[color ? color : '']
        } ${uiTypes} ${className}`}
      >
        {/* ref를 input에 연결 */}
        <input
          className={styles.ipt_field}
          type="text"
          id={id}
          name={name}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChange}
          ref={ref}
          autoComplete={autoComplete}
          maxLength={maxLength}
        />
        <div className={styles.ipt_util}>{children}</div>
      </div>
    </div>
  )
})

// displayName 설정
MultiInput.displayName = 'MultiInput'
