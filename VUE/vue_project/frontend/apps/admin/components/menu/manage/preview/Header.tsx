'use client'

import styles from 'ui/styles/common/_header.module.scss'
import { Dispatch, SetStateAction, useState } from 'react'
import MenuGnb from './MenuGnb'
import { MenuItemType } from 'library/util'

export const Header = ({ gnbList, current, setCurrent }: { gnbList: MenuItemType[]; current: number; setCurrent: Dispatch<SetStateAction<number>> }) => {
  const handleClick = (current: number) => {
    setCurrent(current)
  }

  return (
    <header className={`${styles.header} ${styles.preview}`}>
      <MenuGnb onSetItem={handleClick} activePop={current} gnbList={gnbList} />
    </header>
  )
}

export default Header
