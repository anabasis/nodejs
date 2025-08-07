'use client'
import { useMemo, useEffect } from 'react'
import { ContentBox, SelectMui, BaseInput, ButtonMui, DetailTable, RadioBox, MultiFileUpload } from 'ui'
import dynamic from 'next/dynamic'
import { AlertType, FileListDataType, ModalType, useAlert, useDragFileUpload, useModal, useParamsData } from 'library'
import { QnaAddInitParamsType } from '@type/qna'
import { useQnaEditor } from '@hook/useQnaEditor'
import PartiallyModal from '@components/common/modal/PartiallyModal'
import { useRouter } from 'next/navigation'

type QnaEditorContentType = {
  addQna?: (files: FileListDataType) => void
  qnaAddLoading?: boolean
}

const QnaEditorContent = ({ addQna, qnaAddLoading }: QnaEditorContentType) => {
  const CKEditor = useMemo(() => dynamic(() => import('editor/CKEditor'), { ssr: false }), [])
  const router = useRouter()
  const { modalOpen, modalDataState } = useModal()
  const { alertOpen, alertClose } = useAlert()
  const { params, setChangeParams, checkEmptyValue } = useParamsData<QnaAddInitParamsType>()
  const { selectData, isEdit, qnaNum, selectMenuList, qnaEditLoading, partiallyCheckedCount, openLevelGroup, getDisabled, onChangeSelect, saveEditQna } =
    useQnaEditor()
  const {
    dropRef,
    isDragActive,
    fileInputRef,
    count,
    drmValid,
    setDrmValid,
    removeRef,
    getfileSize,
    setUploadFiles,
    removeUploadCard,
    changeFileInput,
    uploadFiles,
  } = useDragFileUpload({
    tableName: 'TBD_QNA_ATCH',
  })

  const cancelQna = () => {
    const path = isEdit ? `/helpdesk/qna/detail?qnaNum=${qnaNum}` : '/helpdesk/qna'
    const alertState: AlertType = {
      InfoType: 'writing',
      content: (
        <div className="align center mt_30">
          <ButtonMui type="outlined" size="xlarge" onClick={() => alertClose()}>
            Cancel
          </ButtonMui>
          <ButtonMui size="xlarge" onClick={() => router.replace(path)}>
            OK
          </ButtonMui>
        </div>
      ),
    }
    alertOpen(alertState)
  }

  const changeOpenLevel = () => {
    if (modalDataState.length > 0) return
    const modalState: ModalType = {
      title: 'Select member to partially open',
      textTitle: 'Please select member whom the QnA post will be disclosed.',
      maxWidth: 'm',
      content: <PartiallyModal />,
    }
    modalOpen(modalState)
  }

  useEffect(() => {
    if (isEdit && params.qnaAttachResponse?.length > 0) {
      setUploadFiles(params.qnaAttachResponse)
    }
  }, [])

  return (
    <ContentBox>
      <div className="align start mb_20">
        {selectMenuList.map((select, i) => (
          // 필터아이템 -> 글로벌로 마크업 수정
          <div className="item" key={`${select}_${i}`}>
            <p className="body3 typo900 mr_10">{select}</p>
            <SelectMui
              placeholder="Select"
              size="medium"
              value={params[select.toLocaleLowerCase()] || ''}
              onChange={(event) => onChangeSelect(event, select.toLocaleLowerCase())}
              options={selectData[select.toLocaleLowerCase()]}
            />
          </div>
        ))}
      </div>

      <div className="">
        <DetailTable
          colgroup={
            <colgroup>
              <col style={{ width: '180px' }} />
              <col style={{ width: 'auto' }} />
            </colgroup>
          }
        >
          <tr>
            <td colSpan={2} className="pb_20">
              <BaseInput
                placeholder="Please enter subject."
                onChange={(event) => setChangeParams(event, 'title')}
                value={params?.title || ''}
                maxLength={250}
              />
            </td>
          </tr>
          <tr className="">
            <th className="va_top pt_18">
              <span className="capH typo500">Attachment</span>
            </th>
            <td className="pr_0">
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
              <span className="body3 typo900 required">Open level</span>
            </th>
            <td>
              <div className="align start">
                {openLevelGroup.length > 0 &&
                  openLevelGroup.map((option) => (
                    <div key={option.value} className="item">
                      <RadioBox
                        id={option.value}
                        value={option.value}
                        checked={option.value === params.openLevel}
                        text={option.name}
                        onChange={() => setChangeParams(option.value, 'openLevel')}
                      />
                    </div>
                  ))}
                {params?.openLevel === 'PTL' && (
                  <ButtonMui color="black" type="outlined" icon="EditIcon" iconStyle={{ fill: 'var(--navy800)' }} onClick={() => changeOpenLevel()}>
                    Edit {partiallyCheckedCount ? `(${partiallyCheckedCount})` : ''}
                  </ButtonMui>
                )}
              </div>
            </td>
          </tr>
        </DetailTable>
        <div className="editor mt_20">
          <CKEditor
            placeholder="Please enter content."
            tableName="TBD_QNA_ATCH"
            onEditorChange={(data) => setChangeParams(data, 'content')}
            data={params?.content || ''}
          />
        </div>
      </div>
      <div className="cont_bottom_box">
        <div className="align end">
          <ButtonMui type="outlined" size="xlarge" onClick={cancelQna}>
            Cancel
          </ButtonMui>

          <ButtonMui
            type="contained"
            disabled={checkEmptyValue() || getDisabled()}
            size="xlarge"
            isLoading={isEdit ? qnaEditLoading : qnaAddLoading}
            onClick={() => {
              return isEdit ? saveEditQna(uploadFiles) : addQna(uploadFiles)
            }}
          >
            {isEdit ? 'Save' : 'Submit'}
          </ButtonMui>
        </div>
      </div>
    </ContentBox>
  )
}

export default QnaEditorContent
