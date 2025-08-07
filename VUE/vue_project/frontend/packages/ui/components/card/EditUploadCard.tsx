import { useState } from 'react'
import styles from '@ui/styles/components/card/_card.module.scss'
import { Icons } from '@ui/components/Icons'

interface CardProps {
  filesize?: string
  /**
   * 아이콘 정의
   */
  icon?: string
  /**
   * 커스텀 확장 className
   */
  className?: string
  /**
   * Optional click handler
   */
  onClick?: () => void
  children: React.ReactNode
}
const pdfArr = ['pdf', 'pptx']
const wordArr = ['doc', 'docx', 'docm', 'dot']
const excelArr = ['xls', 'xlsx', 'xlsm', 'xlsb', 'xltx']

export const EditUploadCard = ({ onClick, ...others }: CardProps) => {
  const { children, icon, filesize, className } = others
  // const [completed, setCompleted] = useState(false)

  const [isHovering, setIsHovering] = useState(false)

  const renderFileIcon = () => {
    if (typeof icon === 'string') {
      if (pdfArr.includes(icon)) {
        return <Icons.Pdficon width={20} height={20} />
      }
      if (excelArr.includes(icon)) {
        return <Icons.Excelicon width={20} height={20} />
      }
      if (wordArr.includes(icon)) {
        return <Icons.Wordicon width={20} height={20} />
      }
      return <Icons.EtcIcon width={20} height={20} />
    }
  }
  return (
    <>
      <div className={`${styles.card} ${styles.edit} ${styles[className || '']}`}>
        {icon && <span className={styles.upload_ico}>{renderFileIcon()}</span>}
        <p className={`${styles.file_name} caption typo900 pr_12`}>
          <span>{children}</span>
          {filesize && <em>{filesize}</em>}
        </p>
        <button onClick={onClick}>
          <Icons.DeleteIcon width={16} height={16} fill="var(--navy800)" />
        </button>
      </div>
    </>
  )
}
