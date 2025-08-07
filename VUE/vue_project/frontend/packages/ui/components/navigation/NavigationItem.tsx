import styles from '@ui/styles/common/_navigation.module.scss'
import { useState } from 'react'
import { startsWith as _startsWith, range as _range } from 'lodash-es'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { MenuItemType, getRootUrl, isDev, getIsAdmin, useMenu, getIsRoot } from 'library'

type PropsNavItem = {
  children?: React.ReactNode
  v: MenuItemType
  openMenu: { [key in string]: number }
  toggleMenu: (mnuDpth: number, mnuNum: number) => void
  getPath: (path: string) => string
  pathname: string
}

const NavItem = ({ children, v, openMenu, toggleMenu, getPath, pathname }: PropsNavItem) => {
  const isOpenMenu = openMenu[`depth${v.mnuDpth}`] === v.mnuNum
  const hasSubMenu = children && v.subNavs && v.subNavs?.length > 0
  const isOneDepth = v.mnuDpth === 1

  const sliceSlash = (str: string) => (str?.length > 1 ? str?.replace(/\/$/, '') : str)

  const countSlashes = (path: string) => path?.match(/\//g)?.length ?? 0

  const isActive = () => {
    const path = sliceSlash(pathname)
    const menu = sliceSlash(v.mnuUrl)
    if (!menu) return false
    return countSlashes(path) > countSlashes(menu) && menu !== '/' ? _startsWith(path, menu) : path === menu
  }

  const getIcon = (icon: string | null, cssName: string) =>
    icon && <Image src={icon} alt={v.mnuName || 'Icon image'} className={styles[cssName]} width={20} height={20} />

  const icons = isOneDepth && (
    <i className={styles.icon}>
      {v.acvIcon && getIcon(v.acvIcon, 'active')}
      {v.hovIcon && getIcon(v.hovIcon, 'hover')}
      {v.dftIcon && getIcon(v.dftIcon, 'default')}
    </i>
  )

  return (
    (isDev || v.redYn === 'Y' || v.mnuUrl === '/') && (
      <div className={`${styles.item} ${isActive() && styles.active} ${isOpenMenu && styles.open}`}>
        <Link href={getPath(v.mnuUrl)} prefetch={getIsRoot()}>
          {isOneDepth ? icons : null}
          <span className={styles.name}>{v.mnuName}</span>
          {!!hasSubMenu && (
            <button className={styles.nav_btn} onClick={() => toggleMenu(v.mnuDpth, v.mnuNum)}>
              {isOpenMenu ? <ExpandMore style={{ color: 'var(--blue400)' }} /> : <ExpandLess style={{ color: 'var(--navy200)' }} />}
            </button>
          )}
        </Link>
        {!!hasSubMenu && <div className={styles.items}>{children}</div>}
      </div>
    )
  )
}

const WrapNav = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`${styles.nav} ${styles[className || '']}`}>
    <div className={styles.list}>
      <div className={styles.items}>{children}</div>
    </div>
  </div>
)

const NavigationItem = ({ className }: { className?: string }) => {
  const [openMenu, setOpenMenu] = useState<{ [key in string]: number }>({ depth1: 0, depth2: 0, depth3: 0 })
  const pathname = usePathname()
  const { getLnb } = useMenu()

  const toggleMenu = (mnuDpth: number, mnuNum: number) => {
    const depth = `depth${mnuDpth}`
    const tempMenu = { ...openMenu }

    _range(mnuDpth + 1, 4).forEach((i) => (tempMenu[`depth${i}`] = 0))
    tempMenu[depth] = openMenu[depth] !== mnuNum ? mnuNum : 0
    setOpenMenu(tempMenu)
  }

  const getPath = (path: string) => (/^\/.*/.test(path) && !getIsAdmin() ? getRootUrl() + path : path ?? '')

  return (
    <WrapNav className={className}>
      {getLnb?.map((item) => (
        <NavItem v={item} key={item.mnuNum} openMenu={openMenu} toggleMenu={toggleMenu} getPath={getPath} pathname={pathname}>
          {item?.subNavs?.map((subItem) => (
            <NavItem v={subItem} key={subItem.mnuNum} openMenu={openMenu} toggleMenu={toggleMenu} getPath={getPath} pathname={pathname}>
              {subItem?.subNavs?.map((subItem1) => (
                <NavItem v={subItem1} key={subItem1.mnuNum} openMenu={openMenu} toggleMenu={toggleMenu} getPath={getPath} pathname={pathname} />
              ))}
            </NavItem>
          ))}
        </NavItem>
      ))}
    </WrapNav>
  )
}

export default NavigationItem
