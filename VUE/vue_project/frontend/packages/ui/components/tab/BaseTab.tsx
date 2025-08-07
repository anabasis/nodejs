// 작업자 : 최유희
// front : 신은주
import styles from '@ui/styles/components/tab/_tab.module.scss'
import { useCallback, useEffect, useState } from 'react'

interface TabChange {
  oldIndex: number
  newIndex: number
}
interface TabData {
  tabName: string
  name?: string
}
interface TabProps {
  /**
   *  tab item data 정의 (tabName, content) <br/>
   *  ex) [{ tabName: 'tab1' }, { tabName: 'tab2' }, { tabName: 'tab3' }]
   *
   */
  tabData?: TabData[]
  value?: number
  onChange?: ({ oldIndex, newIndex }: TabChange) => void
  onTabClick?: (index: number) => Promise<boolean>
  position?: number
  type?: 'base' | 'round'
  className?: string
}

export const BaseTab = ({ type = 'base', ...others }: TabProps) => {
  const { tabData, onChange, value, onTabClick, position, className } = others
  const [activeItem, setActiveItem] = useState<number>(tabData && value && tabData?.length > value && value > -1 ? value : 0)
  useEffect(() => {
    if (tabData && value !== undefined) {
      tabData?.length > value && value > -1 ? setActiveItem(value) : setActiveItem(0)
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
        setActiveItem(tabIndex)
      }
    },
    [activeItem, onChange, onTabClick]
  )

  // const typeClassName = type === 'round' ? [styles['round_tab_lst']].join(' ') : styles.tab_lst

  return (
    <ul className={`${styles.tab_lst} ${className ?? className} ${tabData && tabData?.length >= 8 && styles.sm} tab_lst`}>
      {tabData &&
        tabData.map((item, index) => (
          // 클릭시 active class 추가
          <li
            onClick={() => onClick(index)}
            className={`${styles['tab_lst_item']} ${index === activeItem ? `${styles['active']} active` : ''}`}
            key={item?.tabName}
          >
            {item?.tabName}
          </li>
        ))}
    </ul>
  )
}
