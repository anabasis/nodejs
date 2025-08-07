'use client'

import styles from 'ui/styles/common/_gnb.module.scss'
import Image from 'next/image'
import { startsWith as _startsWith } from 'lodash-es'
import { MenuItemType } from 'library'

export const MenuGnb = ({ onSetItem, activePop, gnbList }: { onSetItem: Function; activePop: number; gnbList: MenuItemType[] }) => {
  const handleClick = (current: number) => onSetItem(current)

  const ListItemWrap = ({ mnuUrl, mnuNum, children }: { mnuUrl: string; mnuNum: number; children: React.ReactNode }) => {
    return (
      <button className={`${mnuUrl === 'noti' ? styles.unread : ''} ${activePop === mnuNum ? styles.active : ''}`} onClick={() => handleClick(mnuNum)}>
        {children}
      </button>
    )
  }

  const ListItem = ({ item }: { item: MenuItemType }) => (
    <li>
      <ListItemWrap mnuUrl={item.mnuUrl} mnuNum={item.mnuNum}>
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
      {gnbList?.map((item) => (
        <ListItem item={item} key={`gnb${item.mnuNum}`} />
      ))}
    </ul>
  )
}

export default MenuGnb
