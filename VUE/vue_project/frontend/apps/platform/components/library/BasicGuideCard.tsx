// 작업자 : 김병기

import { useState } from 'react'
import styles from 'ui/styles/components/card/_card.module.scss'
import { Badge, EllipsisTypo, Icons } from 'ui/components'
import { useMosueHoverCopy } from 'library'

interface CardProps {
  text: string
  title: string
  manualsDetailId: number
  icon: string
  linstnum?: number
  imageFileName: string
  /**
   * Optional click handler
   */
  moveListPage: (manualsDetailId: number, title: string) => void
}

export const BasicGuideCard = ({ moveListPage, ...others }: CardProps) => {
  const { text, title, linstnum, manualsDetailId, imageFileName } = others

  const { handleMouseEnter, handleMouseLeave, isHovering } = useMosueHoverCopy()
  const getIconModalProps = (type?: string) => {
    return {
      width: 32,
      height: 32,
      // fill: type === 'app' ? '#9D9FFE' : '#A2ADC1',
      //다자인 확인 :: 뷰어 아이콘 색상 고정
      fill: '#9D9FFE',
      icofill: '#C6C5FE',
    }
  }
  const iconObj = {
    noicon: <Icons.NoImg {...getIconModalProps()} />,
    app: <Icons.LibAppIcon {...getIconModalProps()} />,
    project: <Icons.LibProjectIcon {...getIconModalProps()} />,
    commoncode: <Icons.LibCommonCodeIcon {...getIconModalProps()} />,
    tools: <Icons.LibToolsIcon {...getIconModalProps()} />,
    license: <Icons.LibLicenseIcon {...getIconModalProps()} />,
    adminuser: <Icons.LibAdminUserIcon {...getIconModalProps()} />,
    manual: <Icons.LibManualIcon {...getIconModalProps()} />,
    algorithm: <Icons.LibAlgorithmIcon {...getIconModalProps()} />,
    qna: <Icons.LibQnaIcon {...getIconModalProps()} />,
    terms: <Icons.LibTermsIcon {...getIconModalProps()} />,
  }

  return (
    <div
      className={[styles['card'], styles['basic'], styles[isHovering ? 'hover' : '']].join(' ')}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => moveListPage(manualsDetailId, title)}
    >
      <div className={[styles['basic_top']].join(' ')}>
        <div className="align top">
          <button className={`${styles.bg_icon_box} bg_icon_box`}>{iconObj[imageFileName.toLocaleLowerCase() || 'noicon']}</button>
        </div>
        <div className={[styles['basic_title']].join(' ')}>
          <div className="align start gap_10">
            <EllipsisTypo className="tl">{title}</EllipsisTypo>
            {linstnum > 0 && (
              <Badge uiType="solid" color="blue" style="count" size="sm">
                {linstnum}
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className={[styles['basic_bottom']].join(' ')}>
        <EllipsisTypo className="tl" line={3}>
          {text}
        </EllipsisTypo>
      </div>
    </div>
  )
}
