import styles from '@ui/styles/components/typo/_Typo.module.scss'

interface EllipsisTypoProps {
  children: React.ReactNode
  line?: number
  className?: string
  width?: number
  uiType?: 'flex_none' | undefined
}

export const EllipsisTypo = ({ children, ...other }: EllipsisTypoProps) => {
  const { line, className, width, uiType } = other

  return (
    <p
      style={{ maxWidth: `${width && width + 'px'}` }}
      className={`inner_ellipsis  ${styles[`ellipsis_${line || 1}`]} ${className} ${uiType ? styles[uiType] : ''}`}
    >
      {children}
    </p>
  )
}
