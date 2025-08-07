// 작업자 : 최유희
'use client'

import styles from '@ui/styles/components/tab/_tab.module.scss'
import React, { useCallback, useEffect, useState } from 'react'

interface TabChange {
  oldIndex: number
  newIndex: number
}
interface TabProps<T> {
  /**
   *  Round 스타일 탭 컴포넌트입니다. <br/>
   *  tab item data 정의 (tabName)
   *
   *  ex) [{ tabName: 'tab1' }, { tabName: 'tab2' }, { tabName: 'tab3' }]
   *
   */
  size?: 'sm' | undefined
  tabData?: Array<{ [k: string]: string | number | React.ReactNode | any }>
  nameKey?: string
  value?: number
  onChange?: ({ oldIndex, newIndex }: TabChange) => void
  onTabClick?: (index: number) => Promise<boolean>
  isDisabledTab?: boolean
  hasDefault?: boolean // 첫번째 기본선택 패스 여부
}

export function RoundTab<T>({ ...others }: TabProps<T>) {
  const { size, tabData, value, onTabClick, onChange, isDisabledTab, nameKey = 'tabName', hasDefault = true } = others
  const [activeItem, setActiveItem] = useState<number>(tabData && value && tabData?.length > value && value > -1 ? value : 0)

  useEffect(() => {
    if (tabData && value !== undefined) {
      !hasDefault || (tabData?.length > value && value > -1) ? setActiveItem(value) : setActiveItem(0)
    }
  }, [value, tabData])

  const onClick = useCallback(
    async (tabIndex: number) => {
      let isTabClick = onTabClick ? false : true
      if (onTabClick) {
        isTabClick = await onTabClick(tabIndex)
      }
      if (tabIndex !== activeItem && isTabClick) {
        if (onChange) {
          onChange({ oldIndex: activeItem, newIndex: tabIndex })
        }
        //다른 탭 활성화 막기
        if (isDisabledTab !== true) {
          setActiveItem(tabIndex)
        }
      }
    },
    [activeItem, onChange, onTabClick]
  )

  return (
    <div className={styles.tab_container}>
      <ul className={[styles['round_tab_lst'], styles[size || '']].join(' ')}>
        {tabData &&
          tabData.map((item, index) => (
            <li onClick={() => onClick(index)} className={[styles['tab_lst_item'], styles[index === activeItem ? 'active' : '']].join(' ')} key={index}>
              {item[nameKey] && item[nameKey]}
            </li>
          ))}
      </ul>
      <div className={styles['tab_content']}>{tabData && tabData[activeItem] && tabData[activeItem].content}</div>
    </div>
  )
}
