// 작업자 : 서혜진

import * as React from 'react'
import Tooltip from '@mui/material/Tooltip'
import { ClickAwayListener, IconButton } from '@mui/material'
import { Icons } from '@ui/components/Icons'
import styles from '@ui/styles/mui/_tooltip.module.scss'

export interface FilterPopupProps {
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

  title: string

  customButton?: React.ReactNode | undefined
}

export const FilterPopup = ({ ...others }: FilterPopupProps) => {
  const { children, placements, title, customButton } = others
  const [open, setOpen] = React.useState(false)

  const handleTooltipClose = () => {
    setOpen(false)
  }

  const handleTooltipOpen = () => {
    setOpen(true)
  }

  return (
    <>
      <ClickAwayListener onClickAway={handleTooltipClose}>
        <div className={`${styles.tooltip} `}>
          <Tooltip
            classes={{ popper: styles.popper, tooltip: styles.click_content }}
            title={
              <React.Fragment>
                <div className={styles.title}>
                  <h4>{title}</h4>
                  <IconButton className={styles.close} aria-label="close" onClick={() => handleTooltipClose()}>
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
            {customButton ? <>{customButton}</> : <></>}
          </Tooltip>
        </div>
      </ClickAwayListener>
    </>
  )
}
