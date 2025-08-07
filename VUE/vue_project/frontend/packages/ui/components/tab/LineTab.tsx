// 작업자 : 최유희

import { IscIcons } from '@ui/isc/Icons'
import styles from '@ui/styles/components/tab/_tab.module.scss'
import { useState, useEffect, useCallback } from 'react'

interface TabData {
  tabName: string
  name?: string
  iconCheck?: boolean
  disabled?: boolean
}

interface TabChange {
  oldIndex: number
  newIndex: number
}
interface TabProps {
  /**
   *  line 스타일 탭 컴포넌트입니다. <br/>
   *  tab item data 정의 (tabName)
   *
   *  ex) [{ tabName: 'tab1' }, { tabName: 'tab2' }, { tabName: 'tab3' }]
   *
   */
  tabData?: TabData[]
  value?: number
  onChange?: ({ oldIndex, newIndex }: TabChange) => void
  onTabClick?: (index: number) => Promise<boolean>
  /**
   * md :: 중간 사이즈 탭 스타일 (default) <br/>
   * sm :: 작은 사이즈 탭 스타일 <br/>
   * tag :: 숫자 라벨이 붙는 탭 스타일
   */
  style?: 'tag' | 'sm'
  index?: number
  uiType?: 'sticky' | 'default'
  isDisabledTab?: boolean
  className?: string
}

export const LineTab = ({ ...others }: TabProps) => {
  const { tabData, onChange, value, onTabClick, style, isDisabledTab, uiType, className } = others
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
        // [작업자: 신보규] monoOM탭 클릭 막기를 위해 추가했습니다.
        if (isDisabledTab !== true && value !== 1) {
          setActiveItem(tabIndex)
        }
      }
    },
    [activeItem, onChange, onTabClick]
  )

  return (
    <>
      <ul className={[styles.line_tab_lst, styles[style || ''], styles[uiType || ''], uiType == 'sticky' && 'line_tab', className].join(' ')}>
        {tabData &&
          tabData.map((item, index) => (
            // li click시 active class 추가
            // icoCheck true일 경우 check class 추가 (new)
            <li
              onClick={() => {
                onClick(index)
              }}
              className={`
              ${styles.tab_lst_item}
              ${item.iconCheck ? `${styles.check}` : ''}
              ${index === activeItem ? styles['active'] : ''}
              ${item.disabled ? styles.disabled : ''}
              `}
              key={item.tabName}
            >
              {/* tag 타입에만 숫자 불렛 생성됨 */}
              {style === 'tag' && <span className={styles.tag}>{item.iconCheck ? <IscIcons.RoundCheck /> : index + 1}</span>}
              {item.tabName}
            </li>
          ))}
      </ul>
    </>
  )
}
