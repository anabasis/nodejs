import { useState } from 'react'
import styles from '@ui/styles/components/card/_card.module.scss'
import { Icons } from '@ui/components/Icons'
import { getPrvFileUrl, getCdnFileUrl, getRootUrl } from 'library'
import { FileResType } from 'library/type/common'

interface CardProps {
  view?: boolean
  isIsc?: boolean
  filesize?: string
  icon?: string
  className?: string
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void
  children: React.ReactNode
  path?: string
  file?: FileResType
}

const pdfArr = ['pdf', 'pptx']
const wordArr = ['doc', 'docx', 'docm', 'dot']
const excelArr = ['xls', 'xlsx', 'xlsm', 'xlsb', 'xltx']

// 파일 이름과 확장자를 분리하는 함수
const splitFileName = (fileName: string) => {
  const lastDotIndex = fileName?.lastIndexOf('.')
  if (lastDotIndex !== -1) {
    const name = fileName?.slice(0, lastDotIndex)
    const extension = fileName?.slice(lastDotIndex + 1)
    return { name, extension }
  }
  return { name: fileName, extension: '' }
}

export const FileCard = ({ onClick, ...props }: CardProps) => {
  const { children, icon, filesize = '', className, view, path, file, isIsc } = props
  const [isHovering, setIsHovering] = useState(false)
  const [filePath, setFilePath] = useState('')
  const handleMouseOver = () => {
    setIsHovering(true)
  }

  const handleMouseOut = () => {
    setIsHovering(false)
  }

  const setFileUrl = () => {
    if (file) {
      if (file.storageTypeCode === 'PRV') {
        getPrvFileUrl(file).then((res) => {
          if (res) {
            setFilePath(res)
          }
        })
      } else {
        setFilePath(getCdnFileUrl(file) ?? '')
      }
    }
  }

  const renderFileIcon = () => {
    if (typeof icon === 'string') {
      if (pdfArr.includes(icon)) {
        return <Icons.Pdficon width={30} height={30} />
      }
      if (excelArr.includes(icon)) {
        return <Icons.Excelicon width={30} height={30} />
      }
      if (wordArr.includes(icon)) {
        return <Icons.Wordicon width={30} height={30} />
      }
      return <Icons.EtcIcon width={30} height={30} />
    }
  }

  const { name, extension } = splitFileName(children as string)

  const renderDownloadButton = () => {
    const iconColor = isHovering ? '#3357ff' : '#354165'
    return isIsc ? (
      <button onClick={onClick}>
        <Icons.FileDownloadIcon width={20} height={20} fill={iconColor} />
      </button>
    ) : view ? (
      <button onClick={onClick}>
        <Icons.FileViewIcon width={12} height={12} fill={iconColor} />
      </button>
    ) : (
      <button onMouseEnter={setFileUrl}>
        <a href={filePath ?? path} download target="_blank">
          <Icons.FileDownloadIcon width={20} height={20} fill={iconColor} />
        </a>
      </button>
    )
  }

  return (
    <div className={`${styles.card} ${styles.file} ${className ? styles[className] : ''}`} onMouseEnter={handleMouseOver} onMouseLeave={handleMouseOut}>
      {icon && <span className={styles.upload_ico}>{renderFileIcon()}</span>}
      <div className="align">
        <div className={`${styles.file_name}`}>
          <p className="align start pr_12">
            <span className={styles.name}>{file ? file.displayFileName : name}</span>
            {extension && <span className={styles.extension}>.{extension}</span>}
          </p>
          {filesize && <em>{filesize}</em>}
        </div>

        {renderDownloadButton()}
      </div>
    </div>
  )
}
