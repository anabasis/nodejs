import { NoticeAddParamsType } from '@type/notice'
import { RadioBox, ContentBox, ButtonMui, BaseInput, SelectMui, MultiFileUpload, DetailTable, Checkbox } from 'ui'
import { useDragFileUpload, useParamsData, useModal, ModalType, AlertType, useAlert } from 'library'
import { useNoticeEditor } from '@hook/useNoticeEditor'
import { useEffect, useMemo } from 'react'
import dynamic from 'next/dynamic'
import AddNoticeLanguageEditor from './AddNoticeLanguageEditor'
import CorporatePartiallyModal from '@components/common/CorporatePartiallyModal'
import { useRouter } from 'next/navigation'

const NoticeContent = () => {
  const { modalOpen, modalDataState } = useModal()
  const CKEditor = useMemo(() => dynamic(() => import('editor/CKEditor'), { ssr: false }), [])
  const { params, setChangeParams, updateParams } = useParamsData<NoticeAddParamsType>()
  const router = useRouter()
  const { alertOpen, alertClose } = useAlert()
  const { isEdit, editorList, selectData, isSelected, corporateCheckedCount, isSaveLoading, saveNotice, addLanguageEditor, getDisabled } = useNoticeEditor()

  const {
    dropRef,
    fileInputRef,
    isDragActive,
    count,
    drmValid,
    removeRef,
    setDrmValid,
    getfileSize,
    removeUploadCard,
    changeFileInput,
    setUploadFiles,
    uploadFiles,
  } = useDragFileUpload({
    tableName: 'TBD_NTC_ATCH',
  })

  const changeOpenLevel = () => {
    if (modalDataState.length > 0) return
    const modalState: ModalType = {
      title: 'Select corporate to partially open',
      textTitle: 'Please select the company where you want to publish the notice.',
      maxWidth: 'm',
      content: <CorporatePartiallyModal />,
    }
    modalOpen(modalState)
  }

  const cancelNotice = () => {
    const alertState: AlertType = {
      InfoType: 'writing',
      content: (
        <div className="align center mt_30">
          <ButtonMui type="outlined" size="xlarge" onClick={() => alertClose()}>
            Cancel
          </ButtonMui>
          <ButtonMui size="xlarge" onClick={() => router.replace('/notice')}>
            OK
          </ButtonMui>
        </div>
      ),
    }
    alertOpen(alertState)
  }

  useEffect(() => {
    if (isEdit && params.noticeAttachment?.length > 0) {
      setUploadFiles(params.noticeAttachment)
    }
  }, [])

  return (
    <ContentBox>
      <div className="align start">
        <div className="item">
          <p className="body3 required typo900 mr_10">Type</p>
          <SelectMui
            size="medium"
            placeholder="Select"
            value={params?.noticeTypeCode || ''}
            options={selectData?.type}
            onChange={(event) => setChangeParams(event, 'noticeTypeCode')}
          />
        </div>
        <div className="item">
          <p className="body3 required typo900 mr_10">Category</p>
          <SelectMui
            size="medium"
            placeholder="Select"
            value={params?.noticeCategoryCode || ''}
            options={selectData?.category}
            onChange={(event) => setChangeParams(event, 'noticeCategoryCode')}
          />
        </div>
      </div>
      <hr className="mt_20 mb_0" />
      {/* 최유희 :: file upload 컴포넌트 통일 및 마크업 정리 */}
      <DetailTable
        colgroup={
          <colgroup>
            <col width="180px" />
            <col width="auto" />
          </colgroup>
        }
      >
        <tr className="">
          <th className="va_top pt_18">
            <span className="capH typo500">Attatchment</span>
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
            <span className="required">Open level</span>
          </th>
          <td>
            <div className="align start h36">
              {selectData?.openLevel?.length > 0 &&
                selectData?.openLevel.map((option) => (
                  <div key={option.value} className="item">
                    <RadioBox
                      id={option.value}
                      value={option.value}
                      checked={option.value === params.openLevelCode}
                      text={option.name}
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
        <tr>
          <th>Select exposure</th>
          <td>
            <div className="align start gap_20">
              <div className="item">
                <Checkbox
                  id="chk1"
                  value={params.exposureTypeCode === 'NP02'}
                  labelText="Home exposure"
                  onChange={(e) => {
                    const exposureTypeCode = selectData?.exposureTypeCode
                    const checked = e.target.checked
                    if (!checked) {
                      updateParams({
                        ...params,
                        exposurePeriodTypeCode: '',
                        exposureFrequencyCode: '',
                        exposureTypeCode: 'NP01',
                      })
                      return
                    }

                    setChangeParams(e.target.checked ? exposureTypeCode?.[1].value : exposureTypeCode?.[0].value, 'exposureTypeCode')
                  }}
                />
              </div>
              <div className="item gap_10">
                <SelectMui
                  disabled={isSelected}
                  value={params?.exposurePeriodTypeCode || ''}
                  placeholder="Select"
                  size="medium"
                  options={selectData?.exposurePeriodTypeCode}
                  onChange={(e) => setChangeParams(e.target.value, 'exposurePeriodTypeCode')}
                />
                <SelectMui
                  disabled={isSelected || !params?.exposurePeriodTypeCode}
                  value={params?.exposureFrequencyCode || ''}
                  placeholder="Select"
                  size="medium"
                  options={selectData?.exposureFrequencyCode}
                  onChange={(e) => setChangeParams(e.target.value, 'exposureFrequencyCode')}
                />
              </div>
            </div>
          </td>
        </tr>
      </DetailTable>
      <>
        <DetailTable
          className="bt pt_20"
          colgroup={
            <colgroup>
              <col width="100px" />
              <col width="auto" />
            </colgroup>
          }
        >
          <tr>
            <th>
              <span className="required">Language</span>
            </th>
            <td style={{ paddingRight: 0 }}>
              <div className="align">
                <SelectMui disabled options={selectData?.langCode} value={params?.noticeMultiLanguage?.[0]?.languageCode || 'en'} size="medium" />
                <ButtonMui icon="PlusIcon" type="contained" size="medium" color="black" onClick={addLanguageEditor}>
                  Add Language
                </ButtonMui>
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <BaseInput
                value={params?.noticeMultiLanguage?.[0]?.title || ''}
                onChange={(e) =>
                  setChangeParams({
                    noticeMultiLanguage: [
                      {
                        ...params?.noticeMultiLanguage?.[0],
                        title: e.target.value,
                      },
                    ],
                  })
                }
                placeholder="Please enter title."
              />
            </td>
          </tr>
        </DetailTable>
        <div className="editor">
          <CKEditor
            placeholder="Please enter content."
            tableName="TBD_NTC_ATCH"
            onEditorChange={(data) =>
              setChangeParams({
                noticeMultiLanguage: [
                  {
                    ...params?.noticeMultiLanguage?.[0],
                    content: data,
                  },
                ],
              })
            }
            data={params?.noticeMultiLanguage?.[0]?.content}
          />
        </div>
      </>

      {editorList?.length > 0 && editorList?.map((editor) => <AddNoticeLanguageEditor key={editor.id} id={editor.id} editor={editor} />)}
      {/* 언어 추가 박스 */}

      <div className="cont_bottom_box">
        <div className="align end">
          <ButtonMui type="outlined" size="xlarge" onClick={cancelNotice}>
            Cancel
          </ButtonMui>

          <ButtonMui isLoading={isSaveLoading} type="contained" size="xlarge" onClick={() => saveNotice(uploadFiles)} disabled={getDisabled()}>
            {isEdit ? 'Save' : 'Add'}
          </ButtonMui>
        </div>
      </div>
    </ContentBox>
  )
}

export default NoticeContent
