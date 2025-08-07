// 작업자 : 최유희

import { Icons } from '@ui/components/Icons'

import styles from '@ui/styles/isc/_button.module.scss'

interface RoundBtnProps {
  children?: React.ReactNode
  disabled?: boolean
  className?: string // 글로벌 클래스 바인딩
  uiType?: any | undefined // 모듈 클래스 바인딩
  onClick?: () => void

  /**
   *  color : default, secondary
   */
  color?: string
  icon?: keyof typeof Icons

  /**
   *  iconStyle.position: string => left(default), right
   */
  iconStyle?: {
    width?: number
    height?: number
    fill?: string
    strokeWidth?: number
    position?: string
  }
}

export const RoundBtn = ({ onClick, disabled = false, children, className, uiType, ...others }: RoundBtnProps) => {
  const { color, icon, iconStyle } = others
  const IconComponent = icon ? Icons[icon] : null

  // 모듈 클래스 바인딩 uiType 으로 변경
  const uiTypes = typeof uiType === 'object' ? uiType.length > 0 && uiType.map((v: string) => styles[v]).join(' ') : styles[uiType]

  const getColorStyle = () => {
    switch (color) {
      case 'secondary':
        return { fill: 'var(--blue50)' }
      default:
        return { fill: 'var(--bg-f)' }
    }
  }
  const mergedIconStyle = { ...getColorStyle(), ...iconStyle }

  return (
    <button
      className={`${styles.round_btn} ${uiTypes} ${className} ${styles[color || '']} ${
        mergedIconStyle.position ? styles['icon_position_' + mergedIconStyle.position] : ''
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      {IconComponent && (
        <span className={`${styles.icon}`}>
          <IconComponent width={mergedIconStyle.width} height={mergedIconStyle.height} fill={mergedIconStyle.fill} strokeWidth={mergedIconStyle.strokeWidth} />
        </span>
      )}
      <span className={styles.btn_txt}>{children}</span>
    </button>
  )
}
