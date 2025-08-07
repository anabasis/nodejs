'use client'

import styles from 'ui/styles/common/_navigation.module.scss'
import { Drawer } from '@mui/material'
import { Icons } from 'ui/components/Icons'
import NavigationItems from './NavigationItems'
import { isBrowser } from 'library/util/fn'
import { IBasicInfoData } from '@type/menu/basicInfoData'
import { IMenuLocation } from '../menuManagement'
import { MenuItemType } from 'library/util'
import { MenuDetailViewType } from '@type/menu/menumanagement'
import { Dispatch, SetStateAction, useEffect } from 'react'

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
  isAdd,
  lnbList,
  isAdmin,
  basicInformation,
  menuLocation,
  menuDetail,
  current,
  setCurrent,
}: {
  isAdd?: boolean
  lnbList: MenuItemType[]
  isAdmin: boolean
  basicInformation?: IBasicInfoData
  menuLocation?: IMenuLocation
  menuDetail?: MenuDetailViewType
  current: number
  setCurrent: Dispatch<SetStateAction<number>>
}) => {
  return (
    <>
      <WrapLogo isAdmin={isAdmin} />
      <aside className={`${styles.aside} ${styles.preview}`}>
        <Drawer container={isBrowser ? document.body : null} sx={openDrawerSx} className={styles.toggle_drawer} variant={'permanent'}>
          <NavigationItems
            isAdd={isAdd}
            isAdmin={isAdmin}
            basicInformation={basicInformation}
            menuLocation={menuLocation}
            lnbList={lnbList}
            menuDetail={menuDetail}
            current={current}
            setCurrent={setCurrent}
          />
        </Drawer>
      </aside>
    </>
  )
}

export default Navigation
