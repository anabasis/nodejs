import styles from 'ui/styles/common/_navigation.module.scss'
import { Dispatch, MouseEvent, SetStateAction, useState } from 'react'
import { startsWith as _startsWith, range as _range, findIndex } from 'lodash-es'
import Image from 'next/image'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { MenuItemType } from 'library'

type PropsNavItem = {
  children?: React.ReactNode
  v: MenuItemType
  openMenu: { [key in string]: number }
  toggleMenu: (e: MouseEvent<HTMLButtonElement>, mnuDpth: number, mnuNum: number) => void
  resetOpenMenu: (mnuDpth: number) => void
  current: number
  setCurrent: Dispatch<SetStateAction<number>>
}

const NavItem = ({ children, v, openMenu, toggleMenu, resetOpenMenu, current, setCurrent }: PropsNavItem) => {
  const isOpenMenu = openMenu[`depth${v.mnuDpth}`] === v.mnuNum
  const hasSubMenu = children && v.subNavs && v.subNavs?.length > 0
  const isOneDepth = v.mnuDpth === 1

  const getIcon = (icon: string | null, cssName: string) => icon && <Image src={icon} alt={v.mnuName} className={styles[cssName]} width={20} height={20} />

  const icons = isOneDepth && (
    <i className={styles.icon}>
      {v.acvIcon && getIcon(v.acvIcon, 'active')}
      {v.hovIcon && getIcon(v.hovIcon, 'hover')}
      {v.dftIcon && getIcon(v.dftIcon, 'default')}
    </i>
  )

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    setCurrent(v.mnuNum)
    if (isOneDepth) {
      resetOpenMenu(v.mnuDpth)
    }
  }

  return (
    <div className={`${styles.item} ${isOpenMenu && styles.open} ${v.mnuNum === current && styles.active}`} onClick={handleClick}>
      <p>
        {isOneDepth ? icons : null}
        <span className={styles.name}>{v.mnuName}</span>
        {!!hasSubMenu && (
          <button className={styles.nav_btn} onClick={(e) => toggleMenu(e, v.mnuDpth, v.mnuNum)}>
            {isOpenMenu ? <ExpandMore style={{ color: 'var(--blue400)' }} /> : <ExpandLess style={{ color: 'var(--navy200)' }} />}
          </button>
        )}
      </p>
      {!!hasSubMenu && <div className={styles.items}>{children}</div>}
    </div>
  )
}

const WrapNav = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`${styles.nav} ${className && className}`}>
    <div className={styles.list}>
      <div className={styles.items}>{children}</div>
    </div>
  </div>
)

const NavigationItem = ({ lnbList, current, setCurrent }: { lnbList?: MenuItemType[]; current: number; setCurrent: Dispatch<SetStateAction<number>> }) => {
  const [openMenu, setOpenMenu] = useState<{ [key in string]: number }>({ depth1: 0, depth2: 0, depth3: 0 })

  const toggleMenu = (e: MouseEvent<HTMLButtonElement>, mnuDpth: number, mnuNum: number) => {
    e.stopPropagation()
    const depth = `depth${mnuDpth}`
    const tempMenu = { ...openMenu }

    _range(mnuDpth + 1, 4).forEach((i) => (tempMenu[`depth${i}`] = 0))
    tempMenu[depth] = openMenu[depth] !== mnuNum ? mnuNum : 0
    setOpenMenu(tempMenu)
  }

  const resetOpenMenu = (mnuDpth: number) => {
    const tempMenu = { ...openMenu }

    _range(mnuDpth, 4).forEach((i) => (tempMenu[`depth${i}`] = 0))
    setOpenMenu(tempMenu)
  }

  return (
    <WrapNav className="preview">
      {lnbList?.map((item) => (
        <NavItem v={item} key={item.mnuNum} openMenu={openMenu} toggleMenu={toggleMenu} current={current} setCurrent={setCurrent} resetOpenMenu={resetOpenMenu}>
          {item?.subNavs?.map((subItem) => (
            <NavItem
              v={subItem}
              key={subItem.mnuNum}
              openMenu={openMenu}
              toggleMenu={toggleMenu}
              current={current}
              setCurrent={setCurrent}
              resetOpenMenu={resetOpenMenu}
            >
              {subItem?.subNavs?.map((subItem1) => (
                <NavItem
                  v={subItem1}
                  key={subItem1.mnuNum}
                  openMenu={openMenu}
                  toggleMenu={toggleMenu}
                  current={current}
                  setCurrent={setCurrent}
                  resetOpenMenu={resetOpenMenu}
                />
              ))}
            </NavItem>
          ))}
        </NavItem>
      ))}
    </WrapNav>
  )
}

export default NavigationItem
