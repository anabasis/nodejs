// 작업자 : 최유희
// 요상한 알약모양.... 버튼
import { Icons } from '@ui/components/Icons'
import styles from '@ui/styles/isc/_button.module.scss'

interface MultiUtilBtnProps {
  leftData?: React.ReactNode
  children?: React.ReactNode
  isChecked?: boolean
  isSelected?: boolean
  isError?: boolean
  onClick?: () => void
}

export const MultiUtilBtn = ({ children, leftData, onClick, isChecked = false, isSelected = false, isError = false }: MultiUtilBtnProps) => {
  return (
    <div className={[styles.multi_util_btn, isChecked ? styles.checked : '', isSelected ? styles.selected : '', isError ? styles.error : ''].join(' ')}>
      <div className={styles.left} onClick={onClick}>
        {isChecked && <i className={styles.ico_check}></i>}
        {/* <span>ID001</span> */}
        {leftData}
      </div>
      <div className={styles.right}>
        {children}
        {/* <div className="field">
          <p>Request Name</p>
          <p>Analyte Name</p>
        </div> */}
      </div>
    </div>
  )
}
