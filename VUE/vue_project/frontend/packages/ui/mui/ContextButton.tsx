//작업자 : 김병기

import { useState, useCallback } from 'react'
import styles from '@ui/styles/mui/_contextbutton.module.scss'
import { Icons } from '@ui/components/Icons'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

interface ContextButtonProps<T = unknown> {
  /**
   * data : 옵션 리스트 데이터
   */
  options?: Array<{ name: string; onClick?: (data?: T) => void; element?: React.ReactNode }>

  rotate?: boolean

  iconsize?: number
  disabled?: boolean
  rowData?: T
  uiType?: 'dropdown' | string
  children?: React.ReactNode
}

export function ContextButton<T>({ ...others }: ContextButtonProps<T>) {
  const { disabled, options, rotate, iconsize, rowData, uiType, children } = others
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (options && options?.length > 0) {
      setAnchorEl(event.currentTarget)
    }
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleMenuItemClick = useCallback(
    (item: { name: string; onClick?: (data?: T) => void }) => {
      if (item.onClick) {
        item.onClick(rowData)
      }
      handleClose()
    },
    [rowData]
  )

  return (
    <>
      <button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        disabled={disabled}
      >
        {children ? (
          children
        ) : (
          <div className={[styles[rotate ? 'rotate' : '']].join(' ')}>
            <Icons.ContextIcon width={iconsize} height={iconsize} fill="#354165" />
          </div>
        )}
      </button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        classes={{ paper: styles['more_list_paper'] }}
        className={`${styles['more_list']} ${uiType ? styles[uiType] : ''}`}
      >
        {options &&
          options?.length > 0 &&
          options?.map((option, index) => (
            <MenuItem
              key={option.name}
              onClick={() => {
                handleMenuItemClick(option)
              }}
              classes={{ selected: styles['more_list_selected'] }}
              className={[styles['more_list_item']].join(' ')}
            >
              {!!option.element ? option.element : option.name}
            </MenuItem>
          ))}
      </Menu>
    </>
  )
}
