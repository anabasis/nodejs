// 작업자 : 서혜진

import React from 'react'

import styles from '@ui/styles/components/list/_list.module.scss'
interface SubCategoryListProps {
  listData?: any[]
  ellipsis?: boolean
  color?: string // li color 글로벌 클래스 바인딩
}

export const SubCategoryList = ({ listData, ellipsis, color }: SubCategoryListProps) => {
  return (
    <>
      <ul className={`${styles.sub_category_list} ${ellipsis ? styles.ellipsis : ''}`}>
        {listData &&
          listData.map((item, key) => (
            <li key={key} className={`${color}`}>
              {item}
              {key + 1 !== listData.length && <i className={`${styles.bar}`}></i>}
            </li>
          ))}
      </ul>
    </>
  )
}
