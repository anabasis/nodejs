// 작업자 : 최유희

import styles from '@ui/styles/components/accordion/_accordion.module.scss'
import React, { useState } from 'react'

interface AccordionProps {
  /**
   *  아코디언
   */
  children?: React.ReactNode
  onClick?: () => void
}

export const Accordion = ({ onClick, ...others }: AccordionProps) => {
  const { children } = others
  //const [activeItem, setActiveItem] = useState<number>(0)
  // const onClick = (index: any) => {
  //   setActiveItem(index === activeItem ? 0 : index)
  // }
  // activeItem 이전 리스트에 radius 적용을 위한 인덱스..
  //const prevIndex = activeItem - 1

  return (
    <>
      <ul className={styles.accordion_lst}>
        {/* 클래스 규칙  */}
        {/* li Click -> active */}
        {/* Click된 li의 이전 li에는 prev 클래스 필요.. (디자인 이슈)  */}
        <li onClick={onClick} className={`${styles.accordion_lst_item} ${styles.active}`}>
          <div className={styles.accordion_lst_item_title}>
            <div className={styles.lft}>
              <i className={styles.ico}>아이콘</i>
              <span className={styles.name}>타이틀</span>
            </div>
            <div className={styles.rgt}>
              <span className={styles.date}>YYYY-MM-DD</span>
              <button className={styles.btn}>버튼</button>
            </div>
          </div>
          {/* active 되었을때만 노출.. */}
          <div className={styles.accordion_lst_item_content}>{children}</div>
        </li>

        {/* 기존 소스 주석  */}
        {/* {listData &&
          listData.map((item, index) => (
            <li
              onClick={() => onClick(index)}
              className={[styles['accordion_lst_item'], styles[index === activeItem ? 'active' : ''], styles[index === prevIndex ? 'prev' : '']].join(' ')}
              key={item.title}
            >
              <div className={styles['accordion_lst_item_title']}>
                <div className={styles['lft']}>
                  <i className={styles['ico']}>아이콘</i>
                  <span className={styles['name']}>{item.title}</span>
                </div>
                <div className={styles['rgt']}>
                  <span className={styles['date']}>YYYY-MM-DD</span>
                  <button className={styles['btn']}>버튼</button>
                </div>
              </div>
              {index === activeItem && <div className={styles['accordion_lst_item_content']}>{children}</div>}
            </li>
          ))} */}
      </ul>
    </>
  )
}
