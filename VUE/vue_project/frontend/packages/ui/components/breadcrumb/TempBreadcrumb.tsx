// 작업자: 서혜진
// NOTE : 임시 작업 파일, 삭제될 수 있음.

import React, { useState } from 'react'
import styles from '@ui/styles/components/breadcrumb/_breadcrumb.module.scss'
import { Icons } from '@ui/components/Icons'
import { Dropdown } from '@ui/components'

interface BreadcrumbProps {}

export const TempBreadcrumb = ({}: BreadcrumbProps) => {
  const [isDropdown, setDropdown] = useState<Boolean>(false)

  return (
    <>
      <ul className={`${styles.breadcrumb}`}>
        {/* item */}
        <li className={`${styles.breadcrumb_item}`}>
          <span className={`${styles.breadcrumb_icon_menu}`}>
            <img src="https://placehold.it/98x85" alt="" />
            {/*
              NOTE : project
                inactive : <Icons.MenuIconDummy width={20} height={20} fill="#A2ADC1" />
                active : <Icons.MenuIconDummy width={20} height={20} fill="#657496" />
            */}
          </span>

          <div className={`${styles.breadcrumb_item_name}`}>menu depth1</div>

          <div className={`${styles.dropdown_btn}`}>
            <button type="button" onClick={() => setDropdown(!isDropdown)}>
              <Icons.TriangleIcon width={20} height={20} fill="#A2ADC1" />
            </button>
          </div>

          {isDropdown && (
            <>
              <Dropdown />
            </>
          )}
        </li>

        {/* item */}
        <li className={`${styles.breadcrumb_item}`}>
          <span className={`${styles.breadcrumb_icon_menu}`}>
            <Icons.MenuIconDummy width={20} height={20} fill="#A2ADC1" />
          </span>
          <div className={`${styles.breadcrumb_item_name}`}>menu depth2</div>
        </li>
      </ul>
    </>
  )
}
