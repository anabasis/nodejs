// 작업자 : 서혜진

import React, { useState } from 'react'
import styles from '@ui/styles/components/accordion/_accordion.module.scss'
import { Icons } from '@ui/components/Icons'
import { ButtonMui } from '@ui/index'
import { Checkbox } from '@ui/components'

interface AccordionBoxProps {
  isExpanded?: Boolean
  children?: React.ReactNode
  onClick?: () => void
}

export const AccordionBox = ({ children, isExpanded, onClick }: AccordionBoxProps) => {
  // const [expanded, setExpanded] = useState(isExpanded || false)

  // const handleClick = () => {
  //   setExpanded(!expanded)
  //   if (onClick) onClick()
  // }

  return <div className={`${styles.accordion_box} ${isExpanded ? styles.expanded : ''}`}>{children}</div>
}
