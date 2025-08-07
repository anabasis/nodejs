// 작업자 : 김병기

import { useState } from 'react'
import { IconButton } from '@mui/material'
import styles from '@ui/styles/components/card/_card.module.scss'
import { Badge, Icons, BaseInput } from '@ui/components'

interface CardProps {
  text: string
  title: string
  linstnum?: number
  /**
   * Optional click handler
   */
  moveListPage: () => void
}

type IconType = 'complete' | 'edit' | 'delete' | 'drag'

type MouseFnType = (event: React.MouseEvent<HTMLButtonElement>) => void

type IconObjType = {
  complete: React.ReactNode
  edit: React.ReactNode
  delete: React.ReactNode
  drag: React.ReactNode
}

export const BasicGuideCard = ({ moveListPage, ...others }: CardProps) => {
  const { text, title, linstnum } = others
  const [isHovering, setIsHovering] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const [cardValue, setCardValue] = useState({
    title: '',
    description: '',
  })

  return (
    <div
      className={[styles['card'], styles['basic'], styles[isEdit ? 'edit' : '']].join(' ')}
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
      onClick={moveListPage}
    >
      <div className={[styles['basic_top']].join(' ')}>
        <div className="align top">
          <button className="bg_icon_box">
            {/* fill: '#9D9FFE',
    icofill: '#C6C5FE', */}
            <Icons.NoImg width={32} height={32} fill="#9D9FFE" icofill="#C6C5FE" />
          </button>
        </div>
        <div className={[styles['basic_title']].join(' ')}>
          <div className="align start">
            <h2>{title}</h2>
            {linstnum && (
              <Badge uiType="solid" color="blue" style="count" size="sm">
                {linstnum}
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className={[styles['basic_bottom']].join(' ')}>
        <p>{cardValue?.description}</p>
      </div>
    </div>
  )
}
