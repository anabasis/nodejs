import styles from '@ui/styles/components/typo/_Typo.module.scss'
import { Icons } from '@ui/components/Icons'

interface IconTypoProps {
  children?: React.ReactNode | string
  icon?: keyof typeof Icons
  width?: number
  maxWidth?: number
  height?: number
  fill?: string
  className?: string
}

export const IconTypo = ({ icon, children, ...others }: IconTypoProps) => {
  const { width, height, fill, className, maxWidth } = others
  const IconComponent = icon ? Icons[icon] : null
  return (
    <div className={`${styles.icon_typo} ${className}`} style={{ maxWidth: `${maxWidth ? maxWidth + 'px' : '100%'}` }}>
      {IconComponent && (
        <span className={`${styles.icon}`}>
          <IconComponent width={width} height={height} fill={fill} />
        </span>
      )}
      {children}
    </div>
  )
}
