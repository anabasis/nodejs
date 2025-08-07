// 작업자 : 김병기

import { useState } from 'react'
import styles from '@ui/styles/components/card/_card.module.scss'
import { Icons } from '@ui/components/Icons'

interface CardProps {
  /**
   * 아이콘 사이즈 정의
   */
  size?: 'l' | 's'
  /**
   * Optional click handler
   */
  onClick?: () => void
}

export const PlusCard = ({ onClick, ...others }: CardProps) => {
  const { size } = others
  // const [completed, setCompleted] = useState(false)
  const iconSize = size === 'l' ? 50 : size === 's' ? 30 : 30
  const iconProps = {
    width: iconSize,
    height: iconSize,
    fill: '#C6CDDA',
  }
  return (
    <>
      <button
        onClick={onClick}
        className={[styles['card'], styles['plus'], styles[size === 'l' ? 'large' : ''], styles[size === 's' ? 'small' : '']].join(' ')}
      >
        <Icons.PlusIcon {...iconProps} />
      </button>
    </>
  )
}
