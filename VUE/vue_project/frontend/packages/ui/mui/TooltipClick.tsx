// 수정자 : 김수연

import * as React from 'react'
import Tooltip from '@mui/material/Tooltip'
import { ClickAwayListener, IconButton } from '@mui/material'
import { Icons } from '@ui/components/Icons'
import styles from '@ui/styles/mui/_tooltip.module.scss'

export interface TooltipProps {
  /**
   * Optional click handler
   */
  // onClick?: () => void

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

  title?: string
  className?: string
}

export const TooltipClick = ({ ...others }: TooltipProps) => {
  const { children, placements, title, className } = others
  const [open, setOpen] = React.useState(false)

  const handleTooltipClose = () => {
    setOpen(false)
  }

  const handleTooltipOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setOpen(true)
  }

  const handleIconButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    handleTooltipClose()
  }

  return (
    <>
      <ClickAwayListener onClickAway={handleTooltipClose}>
        <div className={`${styles.tooltip} ${className && className}`}>
          <Tooltip
            classes={{ popper: styles.popper, tooltip: styles.click_content }}
            title={
              <React.Fragment>
                <div className={styles.title}>
                  <h4>{title}</h4>
                  <IconButton className={styles.close} aria-label="close" onClick={handleIconButtonClick}>
                    <Icons.XIcon width={24} height={24} fill="#C6CDDA" />
                  </IconButton>
                </div>
                {children}
              </React.Fragment>
            }
            open={open}
            placement={placements}
            disableFocusListener
            disableHoverListener
            disableTouchListener
          >
            {/* 클릭 이벤트 발생시 버튼 유무가 발생함 hover시 필요없음 */}
            <button onClick={handleTooltipOpen}>
              <Icons.TooltipIcon />
            </button>
          </Tooltip>
        </div>
      </ClickAwayListener>
    </>
  )
}
