'use client'

import styles from 'ui/styles/common/_navigation.module.scss'
import { Drawer } from '@mui/material'
import { Icons } from 'ui/components/Icons'
import NavigationItems from './NavigationItems'
import { isBrowser } from 'library/util/fn'
import { MenuItemType } from 'library/util'
import { Dispatch, SetStateAction } from 'react'

const openDrawerSx = {
  '& .MuiDrawer-paper': {
    position: 'inherit',
    boxSizing: 'border-box',
    width: '230px',
    border: 'none',
    justifyContent: 'space-between',
    borderRadius: '8px',
    left: '20px',
    top: '20px',
    height: '100%',
    maxHeight: 'calc(100% - 50px)',
    minHeight: 'calc(100% - 50px)',
  },
}

const WrapLogo = ({ isAdmin }) => {
  return (
    <div className={`${styles.logo_area} ${styles.preview}`} style={{ backgroundColor: 'var(--bg)' }}>
      <button className={`${styles.toggle_btn} mr_6`}>
        <Icons.MenuIcon />
        <span className="blind">메뉴토글버튼</span>
      </button>
      <span className={styles.logo}>{isAdmin ? <Icons.AdminLogo /> : <Icons.Logo />}</span>
    </div>
  )
}

export const Navigation = ({
  lnbList,
  isAdmin,
  current,
  setCurrent,
}: {
  lnbList: MenuItemType[]
  isAdmin: boolean
  current: number
  setCurrent: Dispatch<SetStateAction<number>>
}) => {
  return (
    <>
      <WrapLogo isAdmin={isAdmin} />
      <aside className={`${styles.aside} ${styles.preview}`}>
        <Drawer container={isBrowser ? document.body : null} sx={openDrawerSx} className={styles.toggle_drawer} variant={'permanent'}>
          <NavigationItems isAdmin={isAdmin} lnbList={lnbList} current={current} setCurrent={setCurrent} />
        </Drawer>
      </aside>
    </>
  )
}

export default Navigation
