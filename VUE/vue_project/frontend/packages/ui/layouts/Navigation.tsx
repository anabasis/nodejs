'use client'

import styles from '@ui/styles/common/_navigation.module.scss'
import { useEffect, useState } from 'react'
import { Drawer } from '@mui/material'
import { Icons } from '@ui/components/Icons'
import NavigationItems from '@ui/components/navigation/NavigationItems'
import { isBrowser, getIsAdmin, getRootUrl } from 'library/util/fn'
import Link from 'next/link'

const openDrawerSx = {
  '& .MuiDrawer-paper': {
    position: 'absolute',
    top: '20px',
    bottom: '20px',
    left: '20px',
    height: 'auto',
    border: 'none',
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
}
const closeDrawerSx = {
  '& .MuiDrawer-paper': {
    position: 'absolute',
    top: '20px',
    bottom: '20px',
    left: '20px',
    height: 'auto',
    border: 'none',
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
}

const WrapLogo = ({ toggleDrawer }: { toggleDrawer: () => void }) => {
  return (
    <div className={styles.logo_area}>
      <button className={`${styles.toggle_btn} mr_6`} onClick={toggleDrawer}>
        <Icons.MenuIcon />
        <span className="blind">메뉴토글버튼</span>
      </button>
      <Link href={getIsAdmin() ? '/' : `${getRootUrl()}/`}>
        <span className={styles.logo}>{getIsAdmin() ? <Icons.AdminLogo /> : <Icons.Logo />}</span>
      </Link>
    </div>
  )
}

export const Navigation = ({ className }: { className?: string }) => {
  const [windowWidth, setWindowWidth] = useState(innerWidth)
  const [state, setState] = useState({ left: false })

  const toggleDrawer = (anchor: string, open: boolean) => () => {
    setState({ ...state, [anchor]: open })
  }

  const handleResize = () => {
    setWindowWidth(innerWidth)
  }

  useEffect(() => {
    addEventListener('resize', handleResize)

    return () => {
      removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      <WrapLogo toggleDrawer={toggleDrawer('left', true)} />

      <aside className={`${styles.aside}`}>
        <Drawer
          container={isBrowser ? document.body : null}
          className={windowWidth < 1440 ? styles.toggle_drawer : styles.drawer}
          sx={state['left'] ? openDrawerSx : closeDrawerSx}
          variant={windowWidth < 1440 ? 'temporary' : 'permanent'}
          anchor={'left'}
          open={state['left']}
          onClose={toggleDrawer('left', false)}
        >
          <div className={`${styles.drawer_inner}`}>
            <NavigationItems className={`${getIsAdmin() ? 'admin' : ''}`} />
          </div>
        </Drawer>
      </aside>
    </>
  )
}

export default Navigation
