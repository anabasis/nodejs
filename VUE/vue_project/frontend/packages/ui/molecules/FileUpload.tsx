// 작업자 : 최유희
// 단일 파일 업로드 컴포넌트
import { ButtonMui, Icons } from '@ui/index'
import { FileListDataType } from 'library/hook/useDragFileUpload'
import styled from '@emotion/styled'
import React, { useEffect } from 'react'
import { AlertType, useAlert } from 'library'

type FileUploadType = {
  dropRef: React.RefObject<HTMLDivElement>
  fileInputRef: React.RefObject<HTMLInputElement>
  count?: number // File 업로드 제한 수
  getfileSize: () => string // 예시로 반환 타입은 string으로 가정
  removeUploadCard: (displayFileName: string) => void // FileDataType은 사용자 정의 타입으로 수정이 필요합니다.
  changeFileInput: (event: React.ChangeEvent<HTMLInputElement>) => void
  uploadFiles: FileListDataType // FileDataType은 사용자 정의 타입으로 수정이 필요합니다.
  disabled?: boolean
  isDragActive?: boolean
  customFormat?: string
  fileCapactiy?: number
  inputAccept?: string // input accept
  drmValid?: boolean
  setDrmValid?: (prev: boolean) => void
  removeRef?: () => void
}

const FileDragBox = styled.div<{ active?: boolean; disabled?: boolean }>`
  /* 기본 스타일 */
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 36px;
  box-sizing: border-box;
  flex: 1;
  border: 1px dashed var(--navy200);
  background-color: var(--second100);
  border-radius: 4px;
  /* 조건부 스타일 */
  ${(props) =>
    props.active
      ? `
        border: 1px dashed var(--blue400);
        background: var(--blue10);
      `
      : props.disabled
      ? `
        border: 1px dashed var(--navy200);
        background-color: var(--navy50);
      `
      : ''}
`

// 파일 업로드 버튼 및 파일 정보
const FileUploadArea = styled.div`
  width: 100%;
`

// 업로드 된 파일 UI
const FileUI = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  max-width: calc(100% - 100px);
  height: 36px;
  border: 1px solid var(--navy100);
  border-radius: 4px;
  padding: 10px;
  box-sizing: border-box;
  .file_text {
    color: var(--typo900);
    flex: 1;
    max-width: calc(100% - 40px);
  }
  .file_name {
    max-width: calc(100% - 30px);
    display: inline-block;
    vertical-align: middle;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .extension {
    vertical-align: middle;
    display: inline-block;
  }

  &.disabled {
    //opacity: 0.5;
    pointer-events: none;
    background-color: var(--bg);
    .file_text {
      //color: var(--navy200);
      .file_name,
      .extension {
        color: var(--navy200);
      }
    }
  }
`

export const FileUpload = ({
  drmValid,
  setDrmValid,
  removeRef,
  dropRef,
  disabled = false,
  fileInputRef,
  count = 1,
  customFormat,
  isDragActive,
  fileCapactiy = 500,
  uploadFiles,
  inputAccept,
  getfileSize,
  removeUploadCard,
  changeFileInput,
}: FileUploadType) => {
  //컴포넌트 관리
  const { alertOpen, alertClose } = useAlert()
  const modalState: AlertType = {
    icon: 'warning',
    title: 'DRM documents cannot be uploaded',
    textTitle: 'Please check and upload again.',
    content: (
      <div className="align center mt_30">
        <ButtonMui size="xlarge" onClick={() => alertClose()}>
          OK
        </ButtonMui>
      </div>
    ),
  }

  const [isDisabled, setIsDisabled] = React.useState(false)

  //disabled 값이 변경되면 disabled 상태 변경
  useEffect(() => {
    setIsDisabled(disabled)
  }, [disabled])

  useEffect(() => {
    if (drmValid && removeRef && setDrmValid) {
      alertOpen(modalState)
      removeRef()
      setDrmValid(false)
    }
  }, [drmValid])

  return (
    <FileUploadArea className={isDisabled ? 'disabled' : ''}>
      <div className="align start gap_10" ref={dropRef}>
        <>
          {/* [임의 적용] 파일 업로드시 드래그영역 숨김 (개발 확인 필요) */}
          {/* { drag 발생시 :: active={true} } */}
          {uploadFiles?.length < count && (
            <FileDragBox active={isDragActive} disabled={isDisabled}>
              <span className="caption typo500">Drag file here to upload</span>
            </FileDragBox>
          )}
        </>

        <>
          {/* 업로드 된 피일 file ui */}
          {uploadFiles?.length > 0 && (
            <FileUI className={isDisabled ? 'disabled' : ''}>
              <div className="file_text plr_6">
                <span className="file_name caption">{uploadFiles[0]?.name || uploadFiles[0]?.displayFileName}</span>
                {!uploadFiles[0]?.name && (
                  <span className="extension caption">
                    {uploadFiles[0]?.key ? `.${uploadFiles[0]?.key?.split('.')[1]}` : `.${uploadFiles[0]?.fileExtension}`}
                  </span>
                )}
              </div>
              <button className="ml_10" onClick={() => removeUploadCard(uploadFiles[0]?.name || uploadFiles[0]?.displayFileName || '')} disabled={isDisabled}>
                <Icons.DeleteIcon width={20} height={20} fill={isDisabled ? 'var(--navy100)' : 'var(--navy800)'} />
              </button>
            </FileUI>
          )}
        </>

        <ButtonMui
          color="black"
          icon="FileUploadIcon"
          iconStyle={{ fill: uploadFiles?.length === count || isDisabled ? 'var(--typo200)' : 'var(--bg-f)' }}
          onClick={() => {
            fileInputRef.current?.click()
          }}
          size="medium"
          type="contained"
          disabled={uploadFiles?.length === count || isDisabled}
        >
          Upload
        </ButtonMui>
        <input type="file" ref={fileInputRef} onChange={changeFileInput} className="blind" accept={inputAccept} />
      </div>
      <p className="mt_10 caption typo500">
        {customFormat ? (
          customFormat
        ) : (
          <>
            {uploadFiles?.length > 0 && (
              <>
                <span>File format :</span>
                <span>{uploadFiles[0]?.key ? uploadFiles[0]?.key?.split('.')[1] : uploadFiles[0]?.fileExtension || uploadFiles[0]?.name?.split('.')[1]} /</span>
              </>
            )}
            <span>
              Capacity : Up to {getfileSize() || 0} / {fileCapactiy}MB
            </span>
          </>
        )}
      </p>
    </FileUploadArea>
  )
}
