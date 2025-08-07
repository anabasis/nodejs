import { Icons } from '@ui/components/Icons'

interface NoDataProps {
  text: string
  className?: string
  size?: 'sm' | 'md' | 'lg' // 'sm', 'md' 중 하나로 제한
}

export const NoData = ({ text, className, size = 'lg' }: NoDataProps) => {
  let width = 160
  let height = 160
  switch (size) {
    case 'sm':
      width = 100
      height = 100
      break
    case 'md':
      width = 120
      height = 120
      break // 'md' 케이스  추가
    case 'lg':
      width = 160
      height = 160
      break
  }
  return (
    <div className={`nodata_group cursor_d ${className}`}>
      <Icons.NoData width={width} height={height} />
      <p>{text}</p>
    </div>
  )
}

export default NoData
