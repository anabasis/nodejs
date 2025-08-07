// 작업자 : 최유희

import React from 'react'
import { Icons } from '@ui/components/Icons'
import styles from '@ui/styles/components/form/_input.module.scss'

interface InputProps {
  /**
   *  에러 상태 표시
   */
  error?: boolean

  /**
   *  비활성 상태 표시
   */
  disabled?: boolean

  /**
   *  업로드된 파일이 없으면, 플레이스홀더 표시
   */
  placeholder?: string
  id?: string
  onClick?: () => void
  children?: React.ReactNode
}

export const FileInput = ({ ...others }: InputProps) => {
  const { error, id, placeholder, disabled, onClick } = others
  // const inputRef = React.useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = React.useState<string | undefined>(undefined)

  const onUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target

    if (files && files.length > 0) {
      const file = files[0]
      setFileName(file.name)
    }
  }

  // 버튼 이벤트 주석
  // const onUploadImageButtonClick = () => {
  //   if (inputRef.current) {
  //     inputRef.current.click()
  //   }
  // }

  return (
    <>
      <div className={[styles['ipt_box']].join(' ')}>
        <div className={[styles['file_ipt'], styles[error ? 'error' : '']].join(' ')}>
          <label htmlFor={id}>{fileName ? <span className={[styles['filename']].join(' ')}>{fileName}</span> : placeholder}</label>
          <input type="file" id={id} onChange={onUploadImage} disabled={disabled} />
          {/* 버튼 이벤트 중복으로 주석 */}
          {!fileName && (
            <button onClick={onClick}>
              <Icons.FileUploadIcon width={16} height={16} />
              {fileName && <Icons.DeleteIcon width={16} height={16} />}
            </button>
          )}
          {fileName && (
            <button onClick={() => {}}>
              <Icons.DeleteIcon width={16} height={16} />
            </button>
          )}
        </div>
      </div>
    </>
  )
}
