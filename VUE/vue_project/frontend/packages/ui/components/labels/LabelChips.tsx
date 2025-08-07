// 작업자 : 김병기

import { useState } from 'react'
import styles from '@ui/styles/components/labels/_labels.module.scss'

interface LabelProps {
  /**
   *  스텝 부가 설명이 필요한 경우
   */
  text?: string
  /**
   * 아이콘 정의
   */
  icon?: string | undefined
  /**
   * 컬러 규정 아래와 같이 사용
   * (기본 컬러는 흰색으로 사용)
   */
  color?: 'primary'

  disabled?: boolean
  /**
   * 아이콘 배치의 규정 '왼쪽'에 둬야 될경우 사용
   * (기본은 오른쪽에 배치)
   */
  position?: 'left'

  rectangle?: 'rectangle'
  /**
   * Optional click handler
   */
  onClick?: () => void
  /**
   * 아이콘 클릭 이벤트 필요시 해당 부분 true 하고 기능을 추가 정의 기본은 false 아이콘만 사용가능
   */
  action?: boolean

  size?: string

  children?: React.ReactNode
  svg?: React.ReactNode
}

export const LabelChips = ({ onClick, ...others }: LabelProps) => {
  const { children, text, icon, action, color, position, rectangle, disabled, svg, size } = others
  // const [completed, setCompleted] = useState(false)
  return (
    <>
      <div
        className={[
          styles['label_chips'],
          styles[color || ''],
          styles[position || ''],
          styles[rectangle || ''],
          styles[disabled === true ? 'disabled' : ''],
        ].join(' ')}
      >
        <div className={[styles[size || '']].join(' ')}>
          {!action && position && svg && <>{svg}</>}
          {action && position && svg && <button onClick={onClick}>{svg}</button>}
          {!action && position && icon && <img src={icon} alt="" />}
          {action && position && icon && (
            <button onClick={onClick}>
              <img src={icon} alt="" />
            </button>
          )}
          {text && <em>{text}</em>}
          {children}
          {action && !position && icon && (
            <button onClick={onClick}>
              <img src={icon} alt="" />
            </button>
          )}
          {!action && !position && icon && <img src={icon} alt="" />}
          {action && !position && svg && <button onClick={onClick}>{svg}</button>}
          {!action && !position && svg && <>{svg}</>}
        </div>
      </div>
    </>
  )
}
