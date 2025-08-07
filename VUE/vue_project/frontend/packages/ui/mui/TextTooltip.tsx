//작업자 : 김수연
// ...처리 텍스트 전용 툴팁
//anchor position을 마우스 위치로 지정 따라 움직임
//top / bottom으로만 정의

import React, { useRef } from 'react'
import Tooltip from '@mui/material/Tooltip'
import { Instance } from '@popperjs/core'
import styles from '@ui/styles/mui/_tooltip.module.scss'

interface TooltipProps {
  children: React.ReactNode
  placements?: 'bottom' | 'left' | 'right' | 'top'
  className?: string
}

export const TextTooltip = ({ children, ...others }: TooltipProps) => {
  const { className, placements } = others
  const positionRef = useRef<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })
  const popperRef = useRef<Instance>(null)
  const areaRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (event: React.MouseEvent) => {
    positionRef.current = { x: event.clientX, y: event.clientY }

    if (popperRef.current != null) {
      popperRef.current.update()
    }
  }

  return (
    <Tooltip
      title={<p>{children}</p>}
      placement={placements || 'bottom'}
      arrow
      classes={{
        popper: styles.popper,
        tooltip: styles.hover_content,
        arrow: styles.arrow,
      }}
      PopperProps={{
        popperRef,
        anchorEl: {
          getBoundingClientRect: () => {
            return new DOMRect(positionRef.current.x, areaRef.current!.getBoundingClientRect().y + 8, 0, 0)
          },
        },
      }}
    >
      <div className={`${className} ellipsis_1 w100`} ref={areaRef} onMouseMove={handleMouseMove}>
        {children}
      </div>
    </Tooltip>
  )
}
