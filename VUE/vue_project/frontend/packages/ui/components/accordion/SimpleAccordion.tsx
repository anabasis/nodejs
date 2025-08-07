// 작업자 : 서혜진

import React, { useEffect, useState } from 'react'
import styles from '@ui/styles/components/accordion/_accordion.module.scss'
import { Icons } from '@ui/components/Icons'

interface SimpleAccordionProps {
  title?: string | React.ReactNode // title 내에 버튼이 들어갈 경우가 생겨서 React.ReactNode로 수정
  children?: React.ReactNode
  uiType?: 'fill_bg' | 'no_border' | 'no_pt' | undefined
  //className?: string
  onClick?: () => void
  isExpanded?: Boolean
}

export const SimpleAccordion = ({ title, uiType, children, onClick, isExpanded }: SimpleAccordionProps) => {
  const [expanded, setExpanded] = useState(isExpanded || false)

  const handleClick = () => {
    setExpanded(!expanded)
    if (onClick) onClick()
  }

  useEffect(() => {
    setExpanded(isExpanded || false)
  }, [isExpanded])

  return (
    <div className={`${styles.accordion_simple} ${expanded ? styles.expanded : ''} ${uiType ? styles[uiType] : ''}`}>
      <div className={styles.accordion_simple_summary}>
        <button className={styles.icon_angle} onClick={handleClick}>
          <Icons.AngleIcon width={20} height={20} fill="#354165"></Icons.AngleIcon>
        </button>
        <div className={styles.accordion_simple_title}>{title}</div>
      </div>
      {expanded && <div className={styles.accordion_simple_detail}>{children}</div>}
    </div>
  )
}
