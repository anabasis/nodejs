// 작업자 : 김병기

import { useState } from 'react'
import { IconButton } from '@mui/material'
import styles from '@ui/styles/components/card/_card.module.scss'
import { Icons, EllipsisTypo } from '@ui/components'
import { Cases } from '@mui/icons-material'

// import Picon from '@ui/images/D_icon_project.png'

interface DashboradCardProps {
  type?: 'qna' | 'qnacomment' | 'joinus' | 'invite' | 'corporate'
  cases?: 'cases' | 'pieces' | 'people'
  title?: string
  number?: number
  text?: string
}

export const DashboradAdminCard = ({ ...others }: DashboradCardProps) => {
  const { title, cases, number, text, type } = others

  return (
    <div className={[styles['card'], styles['dashborad_admin']].join(' ')}>
      <div className="align top">
        <div className="mb_10">
          <p>{title}</p>
          <h2>
            <span>{number}</span>
            {cases === 'cases' && <span>건</span>}
            {cases === 'pieces' && <span>개</span>}
            {cases === 'people' && <span>명</span>}
          </h2>
        </div>
        <div className={[styles['dashborad_icon']].join(' ')}>
          {type === 'qna' && <Icons.NoImg width={32} height={32} fill="#c6c5fe" icofill="#9d9ffe" />}
          {type === 'qnacomment' && <Icons.NoImg width={32} height={32} fill="#c6c5fe" icofill="#9d9ffe" />}
          {type === 'joinus' && <Icons.NoImg width={32} height={32} fill="#c6c5fe" icofill="#9d9ffe" />}
          {type === 'invite' && <Icons.NoImg width={32} height={32} fill="#c6c5fe" icofill="#9d9ffe" />}
          {type === 'corporate' && <Icons.NoImg width={32} height={32} fill="#c6c5fe" icofill="#9d9ffe" />}
        </div>
      </div>
      <div className={[styles['project_bottom']].join(' ')}>
        <p>{text}</p>
      </div>
    </div>
  )
}
