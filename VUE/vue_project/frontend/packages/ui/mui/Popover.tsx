import Popover from '@mui/material/Popover'

interface PopoverProps {
  children: React.ReactNode
  anchorEl?: HTMLButtonElement | null
  open?: boolean
  anchorOrigin?: {
    vertical: 'top' | 'center' | 'bottom' | number
    horizontal: 'left' | 'center' | 'right' | number
  }
  transformOrigin?: {
    vertical: 'top' | 'center' | 'bottom' | number
    horizontal: 'left' | 'center' | 'right' | number
  }
  margin?: string
  shadows?: string
  transparent?: boolean
  handleClose?: () => void
  anchorPosition?: { left: number; top: number }
  className?: string
}
// 작업자 : 김수연

export const PopoverMui = ({ children, ...others }: PopoverProps) => {
  const { anchorOrigin, transformOrigin, anchorEl, shadows, transparent, className, handleClose, margin, anchorPosition } = others
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <Popover
      className={className}
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      sx={{
        '& .MuiPopover-paper': {
          borderRadius: '8px',
          boxShadow: shadows ? shadows : 'none',
          backgroundColor: transparent ? 'transparent' : '#fff',
          margin: margin,
        },
      }}
      anchorOrigin={
        anchorOrigin || {
          vertical: 'bottom',
          horizontal: 'right',
        }
      }
      transformOrigin={
        transformOrigin || {
          vertical: 'bottom',
          horizontal: 'left',
        }
      }
      anchorPosition={anchorPosition}
      anchorReference={anchorPosition ? 'anchorPosition' : 'anchorEl'}
    >
      {children}
    </Popover>
  )
}
