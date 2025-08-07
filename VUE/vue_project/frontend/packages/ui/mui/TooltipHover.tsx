// TooltipHover.tsx

import React, { useState } from 'react'
import { ClickAwayListener, Tooltip } from '@mui/material'
import { Icons } from '@ui/components/Icons'
import styles from '@ui/styles/mui/_tooltip.module.scss'

interface TooltipProps {
  //component 추가
  component?: React.ReactNode
  children: React.ReactNode
  placements?:
    | 'bottom-end'
    | 'bottom-start'
    | 'bottom'
    | 'left'
    | 'left-start'
    | 'left-end'
    | 'right'
    | 'right-start'
    | 'right-end'
    | 'top'
    | 'top-start'
    | 'top-end'
  className?: string
  title?: string
  iconStyle?: {
    fill?: string
    width?: number
    height?: number
  }
}

export const TooltipHover = ({ children, placements, className, iconStyle, component }: TooltipProps) => {
  const [open, setOpen] = useState(false)

  const handleTooltipClose = () => {
    setOpen(false)
  }

  const handleTooltipOpen = () => {
    setOpen(true)
  }

  return (
    <div className={`${styles.tooltip} ${className}`}>
      <Tooltip
        classes={{
          popper: styles.popper,
          tooltip: styles.hover_content,
          arrow: styles.arrow,
        }}
        open={open}
        arrow={true}
        placement={placements || 'bottom'}
        title={<div>{children}</div>}
      >
        <button onMouseEnter={handleTooltipOpen} onMouseLeave={handleTooltipClose}>
          {component ? (
            component
          ) : (
            <Icons.TooltipHoverIcon width={iconStyle?.width || 16} height={iconStyle?.height || 16} fill={iconStyle?.fill || 'var(--navy200)'} />
          )}
        </button>
      </Tooltip>
    </div>
  )
}
// fill="var(--navy200)"

export default TooltipHover
