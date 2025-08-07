'use client'

import styles from '@ui/styles/common/_gnb.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { startsWith as _startsWith } from 'lodash-es'
import { getRootUrl, MenuItemType, isDev, useMenu, getIsRoot } from 'library'

const TempAuth = () => <li onClick={() => navigator.clipboard.writeText(window.authKc.getToken())}>getToken</li>

export const MenuGnb = ({ onSetItem, isNewNoti, activePop }: { onSetItem: Function; isNewNoti: boolean; activePop: string }) => {
  const pathname = usePathname()
  const { getGnb } = useMenu()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, current: string) => onSetItem(e.currentTarget, current)

  const ListItemWrap = ({ mnuUrl, children }: { mnuUrl: string; children: React.ReactNode }) => {
    if (/^\/.*/.test(mnuUrl)) {
      return (
        <Link href={getRootUrl() + mnuUrl} prefetch={getIsRoot()} className={mnuUrl !== '' && _startsWith(pathname, mnuUrl) ? styles.active : ''}>
          {children}
        </Link>
      )
    } else {
      return (
        <button
          className={`${mnuUrl === 'noti' && isNewNoti ? styles.unread : ''} ${mnuUrl !== '' && activePop === mnuUrl ? styles.active : ''}`}
          onClick={(e) => handleClick(e, mnuUrl)}
        >
          {children}
        </button>
      )
    }
  }

  const ListItem = ({ item }: { item: MenuItemType }) => (
    <li>
      <ListItemWrap mnuUrl={item.mnuUrl}>
        <span className={styles.ico}>
          {item.dftIcon && <Image src={item.dftIcon} alt={item.mnuName} className={styles.default} width={30} height={30} />}
          {item.hovIcon && <Image src={item.hovIcon} alt={item.mnuName} className={styles.hover} width={30} height={30} />}
          {item.acvIcon && <Image src={item.acvIcon} alt={item.mnuName} className={styles.active} width={30} height={30} />}
        </span>
      </ListItemWrap>
    </li>
  )

  return (
    <ul className={styles.quick_menu}>
      {isDev && <TempAuth />}
      {getGnb?.map((item) => (
        <ListItem item={item} key={`gnb${item.mnuNum}`} />
      ))}
    </ul>
  )
}

export default MenuGnb
