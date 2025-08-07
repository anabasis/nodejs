import { Avatar, AvatarGroup } from '@mui/material'
import styles from '@ui/styles/mui/_avatar.module.scss'

interface AvatarProps {
  data?: { src?: string; alt: string }[]
  size?: 'xsmall' | 'small' | 'medium' | 'large'
  total?: number
  type?: 'rounded' | 'circular' | 'square'
  disabled?: boolean
  max?: number
}

export const AvatarMui = ({ data, ...others }: AvatarProps) => {
  const { size, total, type, disabled, max } = others

  return (
    <AvatarGroup max={max || 4} total={total} classes={{ root: `${styles.avatar_group} ${styles[size || 'small']}` }}>
      {data &&
        data.map((item, index) => (
          <Avatar
            className={`${styles.avatar} ${styles[type || 'rounded']} ${disabled === true && styles.mask}`}
            variant={type || 'rounded'}
            key={index}
            alt={item.alt || '사용자이미지'}
            sizes={size || 'small'}
            src={item.src}
          />
        ))}
    </AvatarGroup>
  )
}
