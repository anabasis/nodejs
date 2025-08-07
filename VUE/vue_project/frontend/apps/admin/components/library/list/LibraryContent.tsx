import { useDragFileUpload, useParamsData, useAlert, useModal, ModalType, AlertType, fileExtension, onlyPdfExtension } from 'library'
import { useEffect, useMemo } from 'react'
import { LibraryManualListAddParamsType } from '@type/library'
import dynamic from 'next/dynamic'
import { RadioBox, ButtonMui, BaseInput, MultiFileUpload, DetailTable } from 'ui'
import { useLibraryEditor } from '@hook/useLibraryEditor'
import CorporatePartiallyModal from '@components/common/CorporatePartiallyModal'

const LibraryContent = () => {
  const CKEditor = useMemo(() => dynamic(() => import('editor/CKEditor'), { ssr: false }), [])
  const { modalOpen } = useModal()
  const { alertOpen, alertClose } = useAlert()
  const { params, setChangeParams, checkEmptyValue } = useParamsData<LibraryManualListAddParamsType>()

  const {
    dropRef,
    fileInputRef,
    count,
    drmValid,
    validFormat,
    setValidFormat,
    removeRef,
    setDrmValid,
    getfileSize,
    removeUploadCard,
    changeFileInput,
    setUploadFiles,
    uploadFiles,
    isDragActive,
  } = useDragFileUpload({
    extensionValid: params.dowlUseYn === 'Y' ? '' : 'pdf',
    fileValidReg: params.dowlUseYn === 'Y' ? fileExtension : onlyPdfExtension,
    tableName: 'TBD_LIBR_ATCH',
  })
  const { isEdit, downloadOption, selectData, saveLibrary, getDisabled, cancelLibrary, corporateCheckedCount, isSaveLoading } = useLibraryEditor({
    params,
    setChangeParams,
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

  const changeOpenLevel = () => {
    const modalState: ModalType = {
      title: 'Select corporate to partially open',
      textTitle: 'Please select corporate to disclose detailed guideline.',
      maxWidth: 'm',
      content: <CorporatePartiallyModal />,
    }
    modalOpen(modalState)
  }
  const cancelProcess = () => {
    const alertState: AlertType = {
      InfoType: 'cancel',
      content: (
        <div className="align center mt_30">
          <ButtonMui type="outlined" size="xlarge" onClick={() => alertClose()}>
            Cancel
          </ButtonMui>
          <ButtonMui size="xlarge" onClick={cancelLibrary}>
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
    if (isEdit && params.fileInfoResponses?.length > 0) {
      setUploadFiles(params?.fileInfoResponses)
    }
  }, [])

  return (
    <>
      <DetailTable
        colgroup={
          <colgroup>
            <col width="180px" />
            <col width="*" />
            <col width="180px" />
            <col width="*" />
          </colgroup>
        }
      >
        <tr>
          <td colSpan={4} className="pb_20">
            <BaseInput maxLength={200} onChange={(e) => setChangeParams(e, 'titl')} value={params?.titl} placeholder="Please enter title. " />
          </td>
        </tr>
        <tr>
          <th className="va_top pt_18">
            <span className="capH typo500">Attatchment</span>
          </th>
          <td colSpan={3}>
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
        <tr>
          <th>
            <span className="required">Download setting</span>
          </th>
          <td>
            <div className="align start">
              {downloadOption?.length > 0 &&
                downloadOption?.map((option) => (
                  <div key={option.value} className="item">
                    <RadioBox
                      disabled={uploadFiles?.length > 0}
                      value={option.value}
                      checked={option.value === params.dowlUseYn}
                      text={option.name}
                      id={option.value}
                      onChange={() => setChangeParams(option.value, 'dowlUseYn')}
                    />
                  </div>
                ))}
            </div>
          </td>
          <th>
            <span className="required">Open level</span>
          </th>
          <td>
            <div className="align start">
              {selectData?.openLevel?.length > 0 &&
                selectData?.openLevel?.map((option) => (
                  <div key={option.value} className="item">
                    <RadioBox
                      value={option.value}
                      checked={option.value === params.openLevelCode}
                      text={option.name}
                      id={option.value}
                      onChange={() => setChangeParams(option.value, 'openLevelCode')}
                    />
                  </div>
                ))}
              {params?.openLevelCode === 'PTL' && (
                <ButtonMui color="black" type="outlined" icon="EditIcon" iconStyle={{ fill: 'var(--navy800)' }} onClick={() => changeOpenLevel()}>
                  Edit {corporateCheckedCount ? `(${corporateCheckedCount})` : ''}
                </ButtonMui>
              )}
            </div>
          </td>
        </tr>
      </DetailTable>
      <div className="editor mt_30">
        <CKEditor placeholder="Please enter content." tableName="TBD_LIBR_ATCH" onEditorChange={(data) => setChangeParams(data, 'cont')} data={params?.cont} />
      </div>

      <div className="cont_bottom_box">
        <div className="align end">
          <ButtonMui type="outlined" size="xlarge" onClick={cancelProcess}>
            Cancel
          </ButtonMui>
          <ButtonMui
            isLoading={isSaveLoading}
            type="contained"
            size="xlarge"
            onClick={() => saveLibrary(uploadFiles)}
            disabled={checkEmptyValue() || getDisabled()}
          >
            {isEdit ? 'Save' : 'Add'}
          </ButtonMui>
        </div>
      </div>
    </>
  )
}

export default LibraryContent
