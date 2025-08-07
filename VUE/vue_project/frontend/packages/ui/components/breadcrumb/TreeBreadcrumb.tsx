// 작업자: 최유희
'use client'

import styles from '@ui/styles/components/breadcrumb/_breadcrumb.module.scss'
import React from 'react'

interface BreadcrumbProps {
  /**

   **/

  ListData?: any[] | undefined
}

export const TreeBreadcrumb = ({ ...others }: BreadcrumbProps) => {
  const { ListData } = others

  return (
    <>
      <ul className={styles.tree_breadcrumb_list}>{ListData && ListData.map((item) => <li key={item.name}>{item.name}</li>)}</ul>
    </>
  )
}

export default TreeBreadcrumb
