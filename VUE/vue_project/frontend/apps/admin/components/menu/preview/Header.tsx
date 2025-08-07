'use client'

import styles from 'ui/styles/common/_header.module.scss'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { groupBy as _groupBy, has as _has, map as _map } from 'lodash-es'
import MenuGnb from './MenuGnb'
import { MenuItemType } from 'library/util'
import { IBasicInfoData } from '@type/menu/basicInfoData'
import { IMenuLocation } from '../menuManagement'
import { MenuDetailViewType } from '@type/menu/menumanagement'

export const Header = ({
  isAdd,
  gnbList,
  basicInformation,
  menuLocation,
  menuDetail,
  current,
  setCurrent,
}: {
  isAdd?: boolean
  current: number
  setCurrent: Dispatch<SetStateAction<number>>
  gnbList: MenuItemType[]
  isAdmin: boolean
  basicInformation?: IBasicInfoData
  menuLocation?: IMenuLocation
  menuDetail?: MenuDetailViewType
}) => {
  const handleClick = (current: number) => {
    setCurrent(current)
  }

  return (
    <header className={`${styles.header} ${styles.preview}`}>
      <MenuGnb
        onSetItem={handleClick}
        activePop={current}
        gnbList={gnbList}
        basicInformation={basicInformation}
        menuLocation={menuLocation}
        isAdd={isAdd}
        menuDetail={menuDetail}
      />
    </header>
  )
}

export default Header
