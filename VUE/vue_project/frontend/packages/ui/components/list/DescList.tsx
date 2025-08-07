// 작업자 : 최유희, 수정 : 김수연

import styles from '@ui/styles/components/list/_list.module.scss'
import React, { useState } from 'react'
import { TooltipClick } from '@ui/index'

interface ListProps {
  /**
   *  desc list (dl) 컴포넌트
   */
  listData?: any[]
  style?: string
  size?: string
  index?: number
  tooltip?: {
    title?: string
    content: React.ReactNode
    uiType?: 'click' | 'hover'
    placements?: string
  }
}

export const Dl = ({ ...others }: ListProps) => {
  const { listData, style, size } = others

  return (
    <>
      {listData &&
        listData.map((item) => (
          <dl
            key={item.listTitle}
            className={[styles['desc_list'], 'desc_list', styles[size || ''], styles[style || ''], item.invalid ? styles['invalid'] : '', 'toggle'].join(' ')}
          >
            <dt>{item.listTitle}</dt>
            <dd>
              {item.listInfo}
              {item.tooltip && (
                <TooltipClick placements={'bottom-start' || item.tooltip.placements} title={item.tooltip.title}>
                  {item.tooltip.content}
                </TooltipClick>
              )}
            </dd>
          </dl>
        ))}
    </>
  )
}
