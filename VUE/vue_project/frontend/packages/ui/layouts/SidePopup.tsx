'use client'

import { Drawer } from '@mui/material'
import styles from '@ui/styles/isc/_aside.module.scss'

//const iconSrc = 'https://cdn-icons-png.flaticon.com/512/2815/2815428.png'

export interface SidePopupProps {
  children?: React.ReactNode
  open?: boolean
  anchorEl?: HTMLButtonElement | null
  handleClose?: () => void
}

export const SidePopup = ({ children, open }: SidePopupProps) => {
  return (
    <>
      <aside className={`${styles.aside}`}>
        <Drawer
          variant="temporary"
          anchor="right"
          open={open}
          className={`${styles.aside_popup}`}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            '& .MuiDrawer-paper': {
              position: 'inherit',
              boxSizing: 'border-box',
              width: '520px',
              border: 'none',
              justifyContent: 'space-between',
              borderRadius: '0',
              right: '0',
              top: '0',
              height: '100%',
              maxHeight: '100vh',
              minHeight: '100vh',
            },
          }}
        >
          <div className="ps_re pb_40 plr_30">{children}</div>
        </Drawer>
      </aside>
    </>
  )
}
