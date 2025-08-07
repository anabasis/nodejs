// 작업자 : 김병기

import { useState } from 'react'
import { IconButton } from '@mui/material'
import styles from '@ui/styles/components/card/_card.module.scss'
import { Icons, EllipsisTypo } from '@ui/components'

// import Picon from '@ui/images/D_icon_project.png'

interface DashboradCardProps {
  type?: 'helpdesk' | 'project' | 'mypage' | 'request'
  title?: string
  txt?: string
  categoryText?: string
  moduleText?: string
  projectname?: string
  name?: string
  update?: string
  date?: string
}

export const DashboradCard = ({ ...others }: DashboradCardProps) => {
  const { title, txt, date, type, categoryText, moduleText, projectname } = others

  return (
    <div className={[styles['card'], styles['dashborad']].join(' ')}>
      <div>
        <div className={[styles['dashborad_icon']].join(' ')}>
          {type === 'project' && <Icons.NoImg width={32} height={32} fill="#c6c5fe" icofill="#9d9ffe" />}
          {type === 'request' && <Icons.NoImg width={32} height={32} fill="#c6c5fe" icofill="#9d9ffe" />}
        </div>
        <div className="mt_10">
          <h2>{title}</h2>
          <p>{txt}</p>
        </div>
      </div>
      <div className={[styles['project_bottom']].join(' ')}>
        {/* {type === 'helpdesk' && (
          <>
            <dl>
              <dt>Category</dt>
              <dd>
                <EllipsisTypo>{categoryText}</EllipsisTypo>
              </dd>
            </dl>
            <dl>
              <dt>Module</dt>
              <dd>
                <EllipsisTypo>{moduleText}</EllipsisTypo>
              </dd>
            </dl>
          </>
        )} */}

        {(type === 'project' || type === 'request') && (
          <>
            <dl>
              <dt>Project name</dt>
              <dd>
                <EllipsisTypo>{projectname}</EllipsisTypo>
              </dd>
            </dl>
            <dl>
              <dt>Disease Category</dt>
              <dd>
                <EllipsisTypo>{categoryText}</EllipsisTypo>
              </dd>
            </dl>
          </>
        )}
        <p>
          {date}
          <span>28 minutes ago</span>
        </p>
      </div>
    </div>
  )
}
