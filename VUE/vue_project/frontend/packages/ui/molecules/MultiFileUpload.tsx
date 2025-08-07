// 작업자 : 최유희
// 다중 파일 업로드 (기존 fileUploadComponent)
import { EditUploadCard, ButtonMui } from '@ui/index'
import { FileListDataType } from 'library/hook/useDragFileUpload'
import styled from '@emotion/styled'
import { AlertType, useAlert } from 'library'
import { useEffect } from 'react'

type MultiFileUploadPropsType = {
  dropRef: React.RefObject<HTMLDivElement>
  fileInputRef: React.RefObject<HTMLInputElement>
  count?: number
  drmValid?: boolean
  isDragActive?: boolean
  getfileSize: () => string // 예시로 반환 타입은 string으로 가정
  setDrmValid?: (prev: boolean) => void
  removeRef?: () => void
  removeUploadCard: (displayFileName: string) => void // FileDataType은 사용자 정의 타입으로 수정이 필요합니다.
  changeFileInput: (event: React.ChangeEvent<HTMLInputElement>) => void
  uploadFiles: FileListDataType // FileDataType은 사용자 정의 타입으로 수정이 필요합니다.
}

// 업로드 된 파일 리스트
const FileUploadList = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  flex-wrap: wrap;
  gap: 10px;

  .file_name {
    max-width: 150px;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: middle;
  }

  .extension {
    vertical-align: middle;
    display: inline-block;
  }
`

// 파일 업로드 드래그 영역 (5개 이상 업로드시 노출 X)
const FileDragBox = styled.div<{ boxColor: boolean; active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 190px;
  min-width: 190px;
  min-height: 34px;
  flex: 1;
  border: 1px dashed var(--navy200);
  background-color: ${(props) => (props?.boxColor ? 'var(--navy50)' : 'var(--second100)')};
  /* background-color: var(--second100); */
  border-radius: 4px;
  ${(props) =>
    props.active &&
    `
    border: 1px dashed var(--blue400);
    background: var(--blue10);
  `}
`

// 파일 업로드 버튼 및 파일 정보
const FileUploadArea = styled.div`
  //margin-bottom: 10px;
`

export const MultiFileUpload = ({
  dropRef,
  fileInputRef,
  count = 5,
  drmValid,
  isDragActive,
  uploadFiles,
  getfileSize,
  removeUploadCard,
  changeFileInput,
  removeRef,
  setDrmValid,
}: MultiFileUploadPropsType) => {
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

  useEffect(() => {
    if (drmValid && removeRef && setDrmValid) {
      alertOpen(modalState)
      removeRef()
      setDrmValid(false)
    }
  }, [drmValid])

  return (
    <div className="" ref={dropRef}>
      {/* FileUploadArea 영역 [s] */}
      <FileUploadArea>
        <div className="align start gap_10">
          {/* [임의 적용] 업로드 된 파일 갯수가 5개 이상일 때 드래그영역 숨김 (개발 확인 필요) */}
          {/* { drag :: active={true} } */}
          <FileDragBox active={isDragActive} boxColor={uploadFiles?.length >= 5}>
            <span className="caption typo500 ">Drag file here to upload</span>
          </FileDragBox>

          <ButtonMui
            color="black"
            icon="FileUploadIcon"
            onClick={() => {
              fileInputRef.current?.click()
            }}
            size="medium"
            type="contained"
            disabled={uploadFiles?.length === count}
            iconStyle={{ fill: uploadFiles?.length === count ? 'var(--typo200)' : 'var(--bg-f)' }}
          >
            Upload
          </ButtonMui>
          <input multiple type="file" ref={fileInputRef} onChange={changeFileInput} className="blind" />
          <p className="mr_10">
            <span className="capH typo500">Upload size {getfileSize() || 0} / 500MB</span> <span className="bl pl_10 ml_10 capH typo500">Up to 5 files</span>
          </p>
        </div>
      </FileUploadArea>

      {/* FileUploadArea영역 [e] */}

      {/* FileUploadList 영역 [s] */}
      <FileUploadList>
        <div className={`${uploadFiles.length > 0 ? 'mt_10' : ''} align start gap_10`}>
          {uploadFiles?.map((file, index) => {
            return (
              <div key={index}>
                {/* 말줄임 추가 */}
                <EditUploadCard
                  onClick={() => removeUploadCard(file.displayFileName || '')}
                  icon={file?.key ? file?.key?.split('.')[1] : file?.fileExtension || ''}
                >
                  <span className="file_name">{file.displayFileName}</span>
                  <span className="extension">.{file?.key?.split('.')[1] || file?.fileExtension}</span>
                </EditUploadCard>
              </div>
            )
          })}
        </div>
      </FileUploadList>
      {/* FileUploadList 영역 [e] */}
    </div>
  )
}
