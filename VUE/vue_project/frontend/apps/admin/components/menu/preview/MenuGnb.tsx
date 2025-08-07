'use client'

import styles from 'ui/styles/common/_gnb.module.scss'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { startsWith as _startsWith, findIndex } from 'lodash-es'
import { MenuItemType, getCdnPreviewUrl, getCdnFileUrl } from 'library'
import { useEffect, useState } from 'react'
import { IMenuLocation } from '../menuManagement'
import { IBasicInfoData } from '@type/menu/basicInfoData'
import { MenuDetailViewType } from '@type/menu/menumanagement'

export const MenuGnb = ({
  isAdd,
  onSetItem,
  activePop,
  gnbList,
  basicInformation,
  menuLocation,
}: {
  isAdd?: boolean
  onSetItem: Function
  activePop: number
  gnbList: MenuItemType[]
  basicInformation?: IBasicInfoData
  menuLocation?: IMenuLocation
  menuDetail?: MenuDetailViewType
}) => {
  const searchParams = useSearchParams()
  const menuId = searchParams.get('id')
  const [gnbCopy, setGnbCopy] = useState<MenuItemType[]>([])

  const handleClick = (current: number) => onSetItem(current)

  const ListItemWrap = ({ mnuUrl, mnuNum, children }: { mnuUrl: string; mnuNum: number; children: React.ReactNode }) => {
    return (
      <button className={`${mnuUrl === 'noti' && styles.unread} ${activePop === mnuNum && styles.active}`} onClick={() => handleClick(mnuNum)}>
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

  const insertNewMenuToGnb = (gnbList: MenuItemType[]) => {
    let modifiedGnb = [...gnbList]

    if (basicInformation) {
      const { menuName, menuDepth, icon, menuURL } = basicInformation
      const newMenuPreviewObject: MenuItemType = {
        mnuNum: 0,
        mnuName: menuName,
        mnuUrl: menuURL ?? '',
        mnuDpth: parseInt(menuDepth),
        acvIcon: getCdnPreviewUrl(icon.active) ?? getCdnFileUrl(icon.active),
        hovIcon: getCdnPreviewUrl(icon.hover) ?? getCdnFileUrl(icon.hover),
        dftIcon: getCdnPreviewUrl(icon.default) ?? getCdnFileUrl(icon.default),
        redYn: '',
        uptYn: '',
        crtYn: '',
        delYn: '',
      }

      if (!isAdd) {
        const menuOldIndex = findIndex(gnbList, (menu) => {
          return menu.mnuNum === parseInt(menuId)
        })
        modifiedGnb.splice(menuOldIndex, 1)
      }
      modifiedGnb.splice(menuLocation.menuSortNum, 0, newMenuPreviewObject)
    }
    setGnbCopy(modifiedGnb)
  }

  useEffect(() => {
    if (gnbList.length > 0) {
      insertNewMenuToGnb(gnbList)
    }
  }, [gnbList])

  return (
    <ul className={styles.quick_menu}>
      {gnbCopy?.map((item) => (
        <ListItem item={item} key={`gnb${item.mnuNum}`} />
      ))}
    </ul>
  )
}

export default MenuGnb
