import styles from 'ui/styles/common/_navigation.module.scss'
import { Dispatch, MouseEvent, SetStateAction, useEffect, useState } from 'react'
import { startsWith as _startsWith, range as _range, findIndex, find } from 'lodash-es'
import Image from 'next/image'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { MenuItemType, getCdnPreviewUrl, getCdnFileUrl } from 'library'
import { IBasicInfoData } from '@type/menu/basicInfoData'
import { IMenuLocation } from '../menuManagement'
import { MenuDetailViewType } from '@type/menu/menumanagement'

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
        <span className={`${styles.name}`}>{v.mnuName}</span>
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

const NavigationItem = ({
  isAdd,
  basicInformation,
  menuLocation,
  lnbList,
  menuDetail,
  current,
  setCurrent,
}: {
  isAdd?: boolean
  basicInformation?: IBasicInfoData
  menuLocation?: IMenuLocation
  lnbList?: MenuItemType[]
  menuDetail?: MenuDetailViewType
  current: number
  setCurrent: Dispatch<SetStateAction<number>>
}) => {
  const [openMenu, setOpenMenu] = useState<{ [key in string]: number }>({ depth1: 0, depth2: 0, depth3: 0 })
  const [lnbCopy, setLnbCopy] = useState<MenuItemType[]>([])

  const toggleMenu = (e: MouseEvent<HTMLButtonElement>, mnuDpth: number, mnuNum: number) => {
    e.stopPropagation()
    const depth = `depth${mnuDpth}`
    const tempMenu = { ...openMenu }

    _range(mnuDpth + 1, 4).forEach((i) => (tempMenu[`depth${i}`] = -1))
    tempMenu[depth] = openMenu[depth] !== mnuNum ? mnuNum : -1
    setOpenMenu(tempMenu)
  }

  const resetOpenMenu = (mnuDpth: number) => {
    const tempMenu = { ...openMenu }

    _range(mnuDpth, 4).forEach((i) => (tempMenu[`depth${i}`] = -1))
    setOpenMenu(tempMenu)
  }

  const addNewMenuToList = (modifiedLnb: MenuItemType[]) => {
    if (basicInformation) {
      const { menuName, menuDepth, icon } = basicInformation
      const newMenuPreviewObject: MenuItemType = {
        mnuNum: 0,
        mnuName: menuName,
        mnuUrl: '',
        mnuDpth: parseInt(menuDepth),
        acvIcon: getCdnPreviewUrl(icon.active) ? getCdnPreviewUrl(icon.active) : getCdnFileUrl(icon.active),
        hovIcon: getCdnPreviewUrl(icon.hover) ? getCdnPreviewUrl(icon.hover) : getCdnFileUrl(icon.hover),
        dftIcon: getCdnPreviewUrl(icon.default) ? getCdnPreviewUrl(icon.default) : getCdnFileUrl(icon.default),
        redYn: '',
        uptYn: '',
        crtYn: '',
        delYn: '',
      }

      if (basicInformation.menuDepth === '1') {
        modifiedLnb.splice(menuLocation.menuSortNum, 0, newMenuPreviewObject)
      } else {
        // parent 메뉴 찾고, 메뉴 list 에 추가
        const parentMenuIndex = findIndex(modifiedLnb, (menu: MenuItemType) => {
          return menuLocation.menuParentNum === menu.mnuNum
        })
        if (modifiedLnb[parentMenuIndex].subNavs?.length > 0) {
          modifiedLnb[parentMenuIndex].subNavs.splice(menuLocation.menuSortNum, 0, newMenuPreviewObject)
        } else {
          modifiedLnb[parentMenuIndex].subNavs = [newMenuPreviewObject]
        }
      }
    }
    return modifiedLnb
  }

  const moveMenuToNewPosition = (modifiedLnb: MenuItemType[]) => {
    if (basicInformation?.menuDepth === '1') {
      const oldIndex = findIndex(modifiedLnb, (menu) => {
        return menu.mnuName === basicInformation.menuName && menu.mnuUrl === basicInformation.menuURL
      })
      const menuToBeMoved = modifiedLnb.splice(oldIndex, 1)
      modifiedLnb.splice(menuLocation.menuSortNum, 0, menuToBeMoved[0])
    } else {
      const oldParentIndex = findIndex(modifiedLnb, ['mnuNum', menuDetail?.basicInfoRes.menuParentNum])
      const currentIndex = findIndex(modifiedLnb[oldParentIndex]?.subNavs, ['mnuNum', menuDetail?.basicInfoRes.menuParentNum])
      const menuToBeMoved = modifiedLnb[oldParentIndex]?.subNavs.splice(currentIndex, 1)
      if (modifiedLnb[menuLocation?.parentIndex]?.subNavs) {
        modifiedLnb[menuLocation.parentIndex].subNavs.splice(menuLocation?.menuSortNum, 0, menuToBeMoved[0])
      }
    }
    return modifiedLnb
  }

  const insertNewMenuToLnb = (lnbList: MenuItemType[]) => {
    let modifiedLnb = [...lnbList]
    if (isAdd) {
      modifiedLnb = addNewMenuToList(modifiedLnb)
    } else {
      modifiedLnb = moveMenuToNewPosition(modifiedLnb)
    }
    setLnbCopy(modifiedLnb)
  }

  useEffect(() => {
    if (lnbList.length > 0) {
      insertNewMenuToLnb(lnbList)
    }
  }, [lnbList])

  return (
    <WrapNav className="preview">
      {lnbCopy?.map((item) => (
        <NavItem v={item} key={item.mnuNum} openMenu={openMenu} current={current} setCurrent={setCurrent} toggleMenu={toggleMenu} resetOpenMenu={resetOpenMenu}>
          {item?.subNavs?.map((subItem) => (
            <NavItem
              v={subItem}
              key={subItem.mnuNum}
              openMenu={openMenu}
              current={current}
              setCurrent={setCurrent}
              toggleMenu={toggleMenu}
              resetOpenMenu={resetOpenMenu}
            >
              {subItem?.subNavs?.map((subItem1) => (
                <NavItem
                  v={subItem1}
                  key={subItem1.mnuNum}
                  openMenu={openMenu}
                  current={current}
                  setCurrent={setCurrent}
                  toggleMenu={toggleMenu}
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
