// 작업자: 서혜진
// NOTE : TBD로 임시 작업 파일, breadcrumb 과 btn 에 사용, 삭제될 수 있음.

import React from 'react'
import styles from '@ui/styles/components/dropdown/_dropdown.module.scss'
import { Icons } from '@ui/components/Icons'

interface DropdownProps {}

export const Dropdown = ({}: DropdownProps) => {
  return (
    <>
      <div className={`${styles.dropdown_wrap} mt_8`} style={{ position: 'absolute', top: '100%', left: '0' }}>
        <ul className={`${styles.dropdown_list}`}>
          {/*
            NOTE :
              hover : <li className={`${styles.dropdown_item} ${styles.hover}`}>
              active : <li className={`${styles.dropdown_item} ${styles.active}`}>
          */}
          <li className={`${styles.dropdown_item} ${styles.hover} ${styles.active}`}>
            <span>AutoMSA Result</span>

            {/* dropdown_wrap */}
            <div className={`${styles.dropdown_wrap} grid7`} style={{ position: 'absolute', top: '0', left: 'calc(100% + 8px + 4px)' }}>
              <div className={`${styles.dropdown_group}`}>
                <p className="pt_4 align center body4 typo500">PTOD</p>
                <ul className={`${styles.dropdown_list} mt_8`}>
                  <li className={`${styles.dropdown_item} ${styles.active}`}>
                    <span>[A001] Influenza A virus (M)</span>
                  </li>
                  <li className={`${styles.dropdown_item}`}>
                    <span>[A002] Analyte name (Gene name)</span>
                  </li>
                  <li className={`${styles.dropdown_item}`}>
                    <span>[A002] Analyte name (Gene name)</span>
                  </li>
                  <li className={`${styles.dropdown_item}`}>
                    <span>[A002] Analyte name (Gene name)</span>
                  </li>
                </ul>
              </div>
              <div className={`${styles.dropdown_group}`}>
                <p className="pt_4 align center body4 typo500">PTOD</p>
                <ul className={`${styles.dropdown_list} mt_8`}>
                  <li className={`${styles.dropdown_item}`}>
                    <span>[A001] Influenza A virus (M)</span>
                  </li>
                  <li className={`${styles.dropdown_item}`}>
                    <span>[A002] Analyte name (Gene name)</span>
                  </li>
                  <li className={`${styles.dropdown_item}`}>
                    <span>[A002] Analyte name (Gene name)</span>
                  </li>
                  <li className={`${styles.dropdown_item}`}>
                    <span>[A002] Analyte name (Gene name)</span>
                  </li>
                </ul>
              </div>
            </div>

            <i className={`${styles.dropdown_item_icon}`}>
              <Icons.AngleIcon width={16} height={16} fill="#354165" />
            </i>
          </li>
          <li className={`${styles.dropdown_item}`}>
            <span>MonoOM Result</span>
          </li>
          <li className={`${styles.dropdown_item}`}>
            <span>Custom Oligo Result</span>
          </li>
          <li className={`${styles.dropdown_item}`}>
            <span>Multiplex Result</span>
          </li>
        </ul>
      </div>
    </>
  )
}
