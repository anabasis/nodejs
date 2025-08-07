// 작업자 : 최유희
import { Icons } from '@ui/components/Icons'
import styles from '@ui/styles/isc/_button.module.scss'

interface FieldWithBtnProps {
  /**
   *  수정되었을 때, 불렛 생성
   */
  onBullet?: boolean
  /**
   *  선택된 host 값이 들어갑니다.
   */
  value?: string
  disabled?: boolean
  buttonText?: string
  onClick?: () => void
}

export const FieldWithBtn = ({ ...other }: FieldWithBtnProps) => {
  const { onBullet = false, value, disabled, buttonText, onClick } = other

  return (
    <div className={styles.host_set_wrap}>
      {onBullet && <i className={styles.bullet}></i>}
      <span className={styles.datafield}>
        {value ? <span className={styles.data_value}>{value}</span> : <span className={styles.placeholder}>Host Select</span>}
      </span>
      <button className={styles.host_btn} onClick={onClick} disabled={disabled}>
        {buttonText} <Icons.AngleIcon width={16} height={16} fill={disabled ? 'var(--typo200)' : '#fff'} />
      </button>
    </div>
  )
}
