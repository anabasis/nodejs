// 작업자: 최유희

import { ClassNames } from '@emotion/react'
import styles from '@ui/styles/common/_contentbox.module.scss'

import React from 'react'

interface ContentBoxWrapProps {
  /**

   **/

  children?: React.ReactNode
  className?: string
}

export const ContentBoxWrap = ({ ...others }: ContentBoxWrapProps) => {
  const { children, className } = others

  return (
    <>
      <div className={[styles['content_wrap'], styles[className ? className : 'content_wrap']].join(' ')}>{children}</div>
    </>
  )
}
