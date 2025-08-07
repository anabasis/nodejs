// 작업자: 김수연
import { Button } from '@mui/material'
import { Icons } from '@ui/components/Icons'
import styles from '@ui/styles/mui/_button.module.scss'

interface ButtonProps {
  children?: React.ReactNode | string
  type?: 'contained' | 'outlined' | 'text'
  color?: 'primary' | 'secondary' | 'gray' | 'error' | 'black' | 'dim' | 'white' | 'skyblue'
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'full' | 'xlarge' | 'hero'
  onBullet?: boolean // isc 용 bullet 속성 추가
  disabled?: boolean
  icon?: keyof typeof Icons
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void
  iconStyle?: {
    fill?: string
    width?: number
    height?: number
    classname?: string
  }
  positions?: 'right' | null
  className?: string // 글로벌 클래스 바인딩
  uiType?: string // 모듈 클래스 바인딩 (.etc / .reset_btn / .classify / .icon ...)
  isLoading?: boolean
}

export const ButtonMui = ({ children, onClick, ...others }: ButtonProps) => {
  const {
    size = 'medium',
    color = 'primary',
    type = 'contained',
    disabled = false,
    icon,
    iconStyle,
    positions,
    className,
    uiType,
    onBullet = false,
    isLoading,
  } = others

  const IconComponent = icon ? Icons[icon] : null
  const getColorStyle = () => {
    if (IconComponent)
      switch (type) {
        case 'outlined':
          switch (color) {
            case 'primary':
              switch (disabled) {
                case true:
                  return { fill: 'var(--blue100)' }
                case false:
                  return { fill: 'var(--blue400)' }
              }
            case 'secondary':
              switch (disabled) {
                case true:
                  return { fill: 'var(--blue100)' }
                case false:
                  return { fill: 'var(--blue400)' }
              }
            case 'gray':
              switch (disabled) {
                case true:
                  return { fill: 'var(--navy200)' }
                case false:
                  return { fill: 'var(--navy800)' }
              }
            case 'error':
              switch (disabled) {
                case true:
                  return { fill: 'var(--error)' }
                case false:
                  return { fill: 'var(--error)' }
              }
            case 'black':
              switch (disabled) {
                case true:
                  return { fill: 'var(--navy200)' }
                case false:
                  return { fill: 'var(--navy800)' }
              }
            case 'skyblue':
              switch (disabled) {
                case true:
                  return { fill: 'var(--skyblue100)' }
                case false:
                  return { fill: 'var(--skyblue400)' }
              }
            default:
              return { fill: 'var(--bg-f)' }
          }
        case 'text':
          switch (color) {
            case 'primary':
              switch (disabled) {
                case true:
                  return { fill: 'var(--blue100)' }
                case false:
                  return { fill: 'var(--blue400)' }
              }
            case 'secondary':
              switch (disabled) {
                case true:
                  return { fill: 'var(--blue100)' }
                case false:
                  return { fill: 'var(--blue400)' }
              }
            case 'gray':
              switch (disabled) {
                case true:
                  return { fill: 'var(--navy200)' }
                case false:
                  return { fill: 'var(--navy800)' }
              }
            case 'error':
              switch (disabled) {
                case true:
                  return { fill: 'var(--error)' }
                case false:
                  return { fill: 'var(--error)' }
              }
            case 'black':
              switch (disabled) {
                case true:
                  return { fill: 'var(--navy200)' }
                case false:
                  return { fill: 'var(--navy800)' }
              }
            case 'skyblue':
              switch (disabled) {
                case true:
                  return { fill: 'var(--skyblue100)' }
                case false:
                  return { fill: 'var(--skyblue400)' }
              }
            default:
              return { fill: 'var(--bg-f)' }
          }
        case 'contained':
          switch (color) {
            case 'primary':
              switch (disabled) {
                case true:
                  return { fill: 'var(--bg-f)' }
                case false:
                  return { fill: 'var(--bg-f)' }
              }
            case 'secondary':
              switch (disabled) {
                case true:
                  return { fill: 'var(--navy200)' }
                case false:
                  return { fill: 'var(--blue400)' }
              }
            case 'gray':
              switch (disabled) {
                case true:
                  return { fill: 'var(--navy200)' }
                case false:
                  return { fill: 'var(--navy800)' }
              }
            case 'error':
              switch (disabled) {
                case true:
                  return { fill: 'var(--error)' }
                case false:
                  return { fill: 'var(--error)' }
              }
            case 'black':
              switch (disabled) {
                case true:
                  return { fill: 'var(--typo200)' }
                case false:
                  return { fill: 'var(--bg-f)' }
              }
            case 'skyblue':
              switch (disabled) {
                case true:
                  return { fill: 'var(--navy100)' }
                case false:
                  return { fill: 'var(--navy400)' }
              }
            default:
              return { fill: 'var(--bg-f)' }
          }
      }
  }
  const getSizeStyle = () => {
    if (IconComponent)
      switch (size || 'medium') {
        case 'xsmall':
          return { width: 20, height: 20 }
        case 'small':
          return { width: 16, height: 16 }
        case 'medium':
          return { width: 16, height: 16 }
        case 'large':
          return { width: 20, height: 20 }
        case 'xlarge':
          return { width: 24, height: 24 }
        case 'hero':
          return { width: 20, height: 20 }
        default:
          return { width: 14, height: 14 }
      }
  }
  const mergedIconStyle = { ...getColorStyle(), ...getSizeStyle(), ...iconStyle }
  const renderIcon = () => {
    if (IconComponent) {
      return (
        <i className={`${styles.ico} ${positions === 'right' ? styles.right : styles.left}`}>
          <IconComponent
            fill={iconStyle?.fill ? iconStyle?.fill : mergedIconStyle.fill}
            width={iconStyle?.width ? iconStyle?.width : mergedIconStyle.width}
            height={iconStyle?.height ? iconStyle?.height : mergedIconStyle.height}
          />
        </i>
      )
    }
    return null
  }

  return (
    <Button
      className={`
        ${styles.button} 
        ${styles[type || 'contained']}
        ${styles[color || 'primary']}
        ${styles[size || 'medium']}
        ${styles[uiType || (isLoading ? 'loading' : '')]}
        ${className || ''}
        ${disabled && styles.disabled}       
        `}
      onClick={onClick}
      variant={type || 'contained'}
      disabled={isLoading || disabled || false}
    >
      {positions !== 'right' && renderIcon()}
      {children && children}
      {positions === 'right' && renderIcon()}
      {/* {positions === 'right' && IconComponent && (
        <i className={`${styles.ico} ${styles.right}`}>
          <IconComponent
            fill={disabled ? (iconStyle?.fill ? iconStyle?.fill : 'var(--navy200)') : mergedIconStyle.fill}
            width={iconStyle?.width ? iconStyle?.width : mergedIconStyle.width}
            height={iconStyle?.height ? iconStyle?.height : mergedIconStyle.height}
          />
        </i>
      )} */}
      {isLoading && (
        <span className="ico_loading">
          <Icons.Loading fill="white" width={35} height={35} />
        </span>
      )}
      {/* isc 에서 버튼에 불렛 필요할 경우...... */}
      {onBullet && <i className={styles.bullet}></i>}
    </Button>
  )
}
