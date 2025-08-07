// front : 신은주
import styles from '@ui/styles/components/list/_list.module.scss'

export const BoxLinkItem = ({
  uiType,
  label,
  action,
  onClick,
}: {
  uiType?: string
  label: React.ReactNode | string
  action: React.ReactNode
  // 전체클릭 이벤트 발생시 사용
  onClick?: () => void
}) => {
  return (
    <li className={uiType ? styles[uiType] : ''} onClick={onClick}>
      <div className="left">{label}</div>
      <div className="right">{action}</div>
    </li>
  )
}
