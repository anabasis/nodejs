import { FileUpload, TooltipHover, InputLabel } from 'ui'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ToastType, useToastPopup } from 'library/hook/useToastPopup'
import { useDragFileUpload, iconFileExtension, getCdnPreviewUrl, getCdnFileUrl } from 'library'
import { FileResType } from 'library/type/common'
import { isEqual } from 'lodash-es'

interface IFileUpload {
  isAdd: boolean
  handleFileChange: (iconType: string, file: FileResType) => void
  iconType: 'Active' | 'Default' | 'Hover'
  tooltipMessage: string
  disabled: boolean
  menuName: string
  isGnb: boolean
  required?: boolean
  prevFile?: FileResType
}

export const IconFileUpload = ({ isAdd, handleFileChange, iconType, tooltipMessage, disabled, menuName, isGnb, required, prevFile }: IFileUpload) => {
  const [previewMenuName, setPreviewMenuName] = useState<string>('')
  const [imgPreview, setImgPreview] = useState<string>('')
  const { dropRef, fileInputRef, getfileSize, removeUploadCard, isDragActive, changeFileInput, uploadFiles, setUploadFiles } = useDragFileUpload({
    tableName: 'TSY_MNU',
    fileValidReg: iconFileExtension,
    storageTypeCode: 'PUB',
    fileSize: 1000000,
    disabled: disabled,
  })

  useEffect(() => {
    if (!!prevFile) {
      setImgPreview(getCdnFileUrl(prevFile) ? getCdnFileUrl(prevFile) : getCdnPreviewUrl(prevFile))
      setUploadFiles([prevFile])
    }
  }, [prevFile])

  useEffect(() => {
    if (!!uploadFiles[0] && !isEqual(prevFile, uploadFiles[0])) {
      // 이건 basic Information file data를 변경하는 부분
      setImgPreview(getCdnPreviewUrl(uploadFiles[0]))
      handleFileChange(iconType, uploadFiles[0] as FileResType)
    } else {
      if (uploadFiles.length == 0) {
        setImgPreview('')
        handleFileChange(iconType, null)
      }
    }
  }, [uploadFiles])

  useEffect(() => {
    if (disabled) {
      setUploadFiles([])
      setImgPreview('')
    }
  }, [disabled])

  useEffect(() => {
    setPreviewMenuName(menuName)
  }, [menuName])

  return (
    <tr>
      <th className="va_top pt_20">
        <InputLabel labelText={` Icon file upload : ${iconType}`} required={required} textcolor="typo900">
          {tooltipMessage ? <TooltipHover placements={'top-start'}>{tooltipMessage}</TooltipHover> : ''}
        </InputLabel>
      </th>
      <td className="pr_50">
        <div className="grid6">
          <FileUpload
            isDragActive={!disabled && isDragActive}
            disabled={disabled}
            dropRef={dropRef}
            fileInputRef={fileInputRef}
            getfileSize={getfileSize}
            removeUploadCard={removeUploadCard}
            changeFileInput={changeFileInput}
            uploadFiles={uploadFiles}
            customFormat="File format: png / Capacity : Up to 1MB"
            inputAccept="image/png"
          />
        </div>
      </td>
      <th className="va_top pt_20">
        <span className="">Preview</span>
      </th>
      <td className={`va_top ${imgPreview ? 'pt_17' : 'pt_11'}`}>
        {imgPreview ? (
          <div className="align v_center start">
            <Image src={imgPreview} alt={'preview'} width={30} height={30} />
            <span className={`ml_10 ${iconType === 'Default' ? 'body2 navy400' : iconType === 'Hover' ? 'body2 navy800' : 'body3 blue400'}`}>
              {!isGnb && previewMenuName.length > 20 && previewMenuName.substring(0, 20) + '...'}
              {!isGnb && previewMenuName.length <= 20 && previewMenuName}
            </span>
          </div>
        ) : (
          <div className="grid6 bg_second50 ptb_10 plr_16">
            <p className="caption navy200">Preview image.</p>
          </div>
        )}
      </td>
    </tr>
  )
}
