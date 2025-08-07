'use client'

import { ContentBox, ButtonMui, BaseInput, DetailTable, MultiFileUpload } from 'ui'
import { useParamsData, useDragFileUpload, FileListDataType, useAlert, AlertType, onlyPdfExtension } from 'library'
import { DetailGuideAddParamsType } from '@type/detail-guilde'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

type DetailGuideContentType = {
  save: (file: FileListDataType) => void
  detailGuideLoading: boolean
}

const DetailGuideContent = ({ save, detailGuideLoading }: DetailGuideContentType) => {
  const { params, setChangeParams, checkEmptyValue } = useParamsData<DetailGuideAddParamsType>()
  const pathname = usePathname()
  const router = useRouter()
  const { alertOpen, alertClose } = useAlert()
  const isEdit = pathname.includes('edit')
  const {
    isDragActive,
    dropRef,
    uploadFiles,
    validFormat,
    drmValid,
    fileInputRef,
    count,
    getfileSize,
    removeRef,
    removeUploadCard,
    changeFileInput,
    setUploadFiles,
    setDrmValid,
    setValidFormat,
  } = useDragFileUpload({
    extensionValid: 'pdf',
    fileValidReg: onlyPdfExtension,
    tableName: 'TGU_DTL_GUD_ATCH',
  })

  const modalState: AlertType = {
    icon: 'warning',
    title: 'Only PDF format can be uploaded',
    textTitle: 'If formats other than PDF files are included,\n only Donwload is available.',
    content: (
      <div className="align center mt_30">
        <ButtonMui size="xlarge" onClick={() => alertClose()}>
          OK
        </ButtonMui>
      </div>
    ),
  }

  const cancelTerms = () => {
    const alertState: AlertType = {
      InfoType: 'cancel',
      content: (
        <div className="align center mt_30">
          <ButtonMui type="outlined" size="xlarge" onClick={() => alertClose()}>
            Cancel
          </ButtonMui>
          <ButtonMui size="xlarge" onClick={() => router.replace('/detail-guide')}>
            OK
          </ButtonMui>
        </div>
      ),
    }
    alertOpen(alertState)
  }

  useEffect(() => {
    if (validFormat) {
      alertOpen(modalState)
      setValidFormat(false)
    }
  }, [validFormat])

  useEffect(() => {
    if (isEdit && params.guideAttachmentRequestList?.length > 0) {
      setUploadFiles(params.guideAttachmentRequestList)
    }
  }, [])

  return (
    <ContentBox>
      <article>
        <div className="cont_title_box">
          <p className="title1">Basic Information</p>
        </div>

        {/* 최유희 : 테이블 컴포넌트 통일 (no_border -> DetailTable) */}
        <DetailTable
          colgroup={
            <colgroup>
              <col style={{ width: '180px' }} />
              <col style={{ width: '40%' }} />
              <col style={{ width: '180px' }} />
              <col style={{ width: '40%' }} />
            </colgroup>
          }
        >
          {isEdit && (
            <tr>
              <th>Code</th>
              <td>
                <div className="grid6">
                  <BaseInput disabled maxLength={100} value={params.guideNumber || ''} placeholder="Please enter the title of the detail guide." />
                </div>
              </td>
            </tr>
          )}

          <tr>
            <th>Title</th>
            <td>
              <div className="grid6">
                <BaseInput
                  maxLength={100}
                  onChange={(event) => setChangeParams(event, 'title')}
                  value={params.title || ''}
                  placeholder="Please enter the title of the detail guide."
                />
              </div>
            </td>
            <th>Path parameter</th>
            <td colSpan={3}>
              <div className="grid6 align start gap_10">
                <div className="flex1">
                  <BaseInput
                    onChange={(event) => setChangeParams(event, 'moveParameter')}
                    value={params.moveParameter || ''}
                    placeholder="Please enter parameters."
                  ></BaseInput>
                </div>
              </div>
            </td>
          </tr>
        </DetailTable>
      </article>
      <article>
        <div className="cont_title_box">
          <p className="title1">File upload</p>
          <p className="body2">Only PDF files can be uploaded. Able to upload up to 5 items.</p>
        </div>

        <DetailTable
          colgroup={
            <colgroup>
              <col style={{ width: '180px' }} />
              <col style={{ width: 'auto' }} />
            </colgroup>
          }
        >
          <tr>
            <th className="va_top pt_18">File</th>
            <td colSpan={3} className="">
              <MultiFileUpload
                isDragActive={isDragActive}
                setDrmValid={setDrmValid}
                removeRef={removeRef}
                drmValid={drmValid}
                dropRef={dropRef}
                fileInputRef={fileInputRef}
                count={count}
                getfileSize={getfileSize}
                removeUploadCard={removeUploadCard}
                changeFileInput={changeFileInput}
                uploadFiles={uploadFiles}
              />
            </td>
          </tr>
        </DetailTable>
      </article>

      <div className="cont_bottom_box">
        <div className="align end">
          <ButtonMui type="outlined" size="xlarge" onClick={cancelTerms}>
            Cancel
          </ButtonMui>
          <ButtonMui
            isLoading={detailGuideLoading}
            disabled={checkEmptyValue() || uploadFiles.length === 0}
            type="contained"
            size="xlarge"
            onClick={() => save(uploadFiles)}
          >
            {isEdit ? 'Save' : 'Add'}
          </ButtonMui>
        </div>
      </div>
    </ContentBox>
  )
}

export default DetailGuideContent
