// 작업자 : 최유희
// 인실리코용 다중파일 업로드 퍼블
import { useEffect, useRef, ChangeEvent } from 'react'
import { EditUploadCard, ButtonMui } from '@ui/index'
//import { useParamsData } from 'library/hook/useParamsData'
// import { useDragFileUpload } from 'library/hook/useDragFileUpload'
import styled from '@emotion/styled'
import { useToastPopup } from 'library'

type FileListItem = {
  flNm: string
  flSz: number
  flPath: string
  crtDt?: string
  crtrUid?: string
  dspFlNm: string
  id?: number
  mdfDt?: string
  mdfrUid?: string
  tblNm?: string
}

type FileListProps = FileListItem[]

type FileUploadListItemProps = {
  item: FileListItem
  onDeleteItem: Function
}

type MultiUploadProps = {
  fileList: FileListProps
  onAddItems: Function
  onDeleteItem: Function
  maxFileLength: number
  maxFileSize: number
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
const FileDragBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 190px;
  min-width: 190px;
  min-height: 34px;
  flex: 1;
  border: 1px dashed var(--navy200);
  background-color: var(--second100);
  border-radius: 4px;
`

// 파일 업로드 버튼 및 파일 정보
const FileUploadArea = styled.div`
  margin-bottom: 10px;
`

const FileUploadListItem = ({ item, onDeleteItem }: FileUploadListItemProps) => {
  const { dspFlNm, flPath } = item
  const splitFlNm = dspFlNm.split('.')
  const thisEx = [...splitFlNm].reverse()[0]
  const FlNm = splitFlNm.filter((v) => v !== thisEx).join('.')
  const getEx = (path: string) => path.split('.').reverse()[0] // 임시
  const outEx = (fileName: string) => {
    const fileNameArr = fileName.split('.')
    const resultArr = fileNameArr.length > 1 ? fileNameArr.filter((v, i) => fileNameArr.length - 1 !== i) : fileNameArr
    return resultArr.join('')
  }
  // const thisEx = getEx(flPath)

  return (
    <div>
      <EditUploadCard onClick={() => onDeleteItem(item)} icon={thisEx}>
        <span className="file_name">{FlNm}</span>
        <span className="extension">.{thisEx}</span>
      </EditUploadCard>
    </div>
  )
}

export const IscMultiFileUpload = ({ fileList, onAddItems, onDeleteItem, maxFileLength = 5, maxFileSize = 10 }: MultiUploadProps) => {
  const { toastOpen, getToastState } = useToastPopup()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const totalFileSize = fileList.reduce((p, v) => p + v.flSz, 0) / Math.pow(1024, 2)
  const getSizeToMB = (size: number) => size / Math.pow(1024, 2)
  const isFullLength = fileList.length >= maxFileLength

  // TODO: 포맷 정의 못찾겠음.

  const addFileList = (e: any, currentFileList: File[]) => {
    const length = currentFileList.length + fileList.length
    const isOverSize = getSizeToMB(fileList.reduce((p, v) => p + v.flSz, 0) + currentFileList.reduce((p, v) => p + v.size, 0)) > maxFileSize
    const isOverLength = length > maxFileLength
    const isAreadyUploaded = (currentFileList || []).some((v) => (fileList || []).some((vv) => v.name === vv.dspFlNm))
    const setToastMsg = (content: string) => toastOpen(getToastState({ content, icon: 'error' }))

    if (isOverSize) {
      setToastMsg('The file exceeds size limit.')
    } else if (isOverLength) {
      setToastMsg('The number of files exceeds the upload limit.')
    } else if (isAreadyUploaded) {
      setToastMsg('The file has already been uploaded.')
    } else {
      onAddItems(currentFileList)
    }

    e.preventDefault()
  }

  // 파일 용량을 넘었을 때: The file exceeds size limit.
  // 첨부 불가 포맷일 때: The file format cannot be attached.
  // 이미 존재하는 파일명 업로드 시: The file has already been uploaded
  // The number of files exceeds the upload limit.

  return (
    <div>
      {/* FileUploadArea 영역 [s] */}
      <FileUploadArea>
        <div className="align start gap_10">
          {/* 업로드 된 파일 갯수가 5개 이상일 때 드래그영역 숨김 */}
          {/* TODO: 한번에 등록시도했을 때 갯수가 5개 넘어가는 부분 처리 필요 */}
          {/* {fileList.length < maxLength && (
            <> */}
          <FileDragBox
            onDrop={(e) => {
              isFullLength ? e.preventDefault() : addFileList(e, Array.from(e.dataTransfer.files || []))
            }}
            onDragOver={(e) => {
              e.preventDefault()
            }}
          >
            <span className="caption typo500">Drag file here to upload</span>
          </FileDragBox>
          <ButtonMui
            color="black"
            icon="FileUploadIcon"
            onClick={() => {
              fileInputRef.current?.click()
            }}
            size="medium"
            type="contained"
            disabled={isFullLength}
          >
            Upload
          </ButtonMui>
          <input multiple type="file" ref={fileInputRef} onChange={(e) => addFileList(e, Array.from(e.target.files || []))} className="blind" />
          {/* </>
          )} */}
          <p className="mr_10">
            <span className="capH typo500">
              Upload size {Math.floor(fileList.reduce((p, v) => p + v.flSz, 0) / Math.pow(1024, 2))} / {maxFileSize}MB
            </span>{' '}
            <span className="bl pl_10 ml_10 capH typo500">Up to {maxFileLength} files</span>
          </p>
        </div>
      </FileUploadArea>

      {/* FileUploadArea영역 [e] */}

      {/* FileUploadList 영역 [s] */}
      <FileUploadList>
        {fileList.map((fileItem, i) => (
          <FileUploadListItem key={`${fileItem.id}${i}`} item={fileItem} onDeleteItem={onDeleteItem} />
        ))}
      </FileUploadList>
      {/* FileUploadList 영역 [e] */}
    </div>
  )
}
