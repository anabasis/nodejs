// 작업자: 김수연

import { useState, ChangeEvent, forwardRef, useEffect } from 'react'
import styles from '@ui/styles/components/form/_textarea.module.scss'

interface TextAreaProps {
  length?: boolean
  maxLength?: number
  placeholder?: string
  size?: 'sm' | 'md' | 'lg' | undefined
  value?: string
  className?: string
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void
  disabled?: boolean
  readOnly?: boolean
  name?: string
  error?: boolean
  color?: string // 상태별 컬러 텍스트 변경
  uiType?: any | undefined // 상태별 UI 변경 (타입 변경)
  height?: string | number // 플랫폼 (h74, h148 , h200 ) 고정타입, 인실리코 유동타입.. (default : 74)
  unit?: string //단위 추가 (default : Character)
  charCode?: number[]
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      length = false,
      readOnly = false,
      maxLength,
      unit,
      placeholder,
      size,
      value,
      className,
      onChange,
      disabled,
      name,
      height,
      color,
      uiType,
      error,
      charCode,
    },
    ref
  ) => {
    const [count, setCount] = useState(0)

    const onTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setCount(e.target.value.length)
      if (onChange) {
        onChange(e)
      }
    }

    const onkeyCheck = (e: any) => (charCode || []).some((v) => e.charCode == v) && e.preventDefault()

    // textarea 높이 구분 (글로벌 height class 와 네이밍 통일)
    const heightType = typeof height === 'string' ? styles[height] : styles[`h${height}`]

    const uiTypes = typeof uiType === 'object' ? uiType.length > 0 && uiType.map((v: string) => styles[v]).join(' ') : styles[uiType]

    useEffect(() => {
      setCount(value?.length || 0)
    }, [value])

    return (
      <>
        <div
          className={`${styles.textarea} ${size ? styles[size] : ''} ${readOnly ? styles.readonly : ''} ${color ? styles[color] : ''} ${uiTypes} ${
            error ? styles.error : ''
          } ${heightType} ${className} `}
        >
          <textarea
            placeholder={placeholder || '입력해주세요.'}
            value={value}
            onChange={onTextareaChange}
            disabled={disabled}
            readOnly={readOnly}
            maxLength={maxLength}
            name={name}
            ref={ref}
            onKeyPress={onkeyCheck}
          />

          {length && (
            <p className={styles.length}>
              <span className="plr_4">{value?.length || count}</span>
              {maxLength && <span className="pr_4">{'/ ' + maxLength}</span>}
              {unit ? unit : 'Character'}
            </p>
          )}
        </div>
      </>
    )
  }
)

// displayName 설정
TextArea.displayName = 'TextArea'
