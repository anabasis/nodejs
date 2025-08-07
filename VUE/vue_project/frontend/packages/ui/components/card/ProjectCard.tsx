import { useState } from 'react'
import { IconButton } from '@mui/material'
import styles from '@ui/styles/components/card/_card.module.scss'
import { Badge } from '@ui/components'

interface ProjectCardProps {
  title?: string
  name?: string
  update?: string
  date?: string
  status?: string
  index: number
}

export const ProjectCard = ({ ...others }: ProjectCardProps) => {
  const { title, status, name, update, date, index } = others

  return (
    <div className={[styles['card'], styles['project'], styles[status && index === 0 ? status.toLowerCase() : 'done']].join(' ')}>
      <div>
        <div className="mb_10">
          <Badge style="square" color={index === 0 ? `pj_${status?.toLowerCase()}` : `pj_done`} uiType="solid">
            {status}
          </Badge>
        </div>
        <div>
          <h2 className="title2">{title}</h2>
          <p className="body2">Editor : {name}</p>
          <p className="body2">Edited date : {update}</p>
        </div>
      </div>
      <div className={[styles['project_bottom']].join(' ')}>
        <p>{date}</p>
      </div>
    </div>
  )
}
