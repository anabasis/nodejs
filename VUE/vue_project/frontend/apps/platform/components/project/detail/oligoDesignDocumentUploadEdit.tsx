'use client'

import { ChangeEvent, Dispatch, useCallback, useEffect, useMemo, useState } from 'react'
import { ButtonMui } from 'ui/mui'
import { BaseInput, DetailTable, PreTypo, TextArea } from 'ui/components'
import { FileUpload } from 'ui/molecules'
import { useDocumentDetailData, useDocumentEditMutation } from '@store/server/useProjectQuery'
import { useDragFileUpload, useParamsData, FileListDataType, changeTimeLocal } from 'library'
import { useAtom } from 'jotai'
import { oligoDesignDocumentEdit } from '@store/client/project'
import { useToastPopup } from 'library/hook/useToastPopup'
import { ProjectBasicInfoType } from '@type/project/projectType'
import { getMGAuth } from '../projectCommon'
import { useUser } from 'library/hook'

export default function OligoDesignDocumentUploadEdit({
  projectInfo,
  onClose,
  documentNum,
  processNumber,
  processCode,
}: {
  projectInfo: ProjectBasicInfoType
  onClose: (type: string) => void
  documentNum: number
  processNumber: number
  processCode: string
}) {
  const {
    dropRef,
    fileInputRef,
    isDragActive,
    count,
    getfileSize,
    removeUploadCard,
    changeFileInput,
    uploadFiles,
    setUploadFiles,
    drmValid,
    setDrmValid,
    removeRef,
  } = useDragFileUpload({
    tableName: 'TPJ_PRJ_FL',
  })
  const { userInfo } = useUser()
  const { toastOpen } = useToastPopup()
  const [isDocumentEdit, setDocumentEdit] = useAtom(oligoDesignDocumentEdit)
  const [documentInfo, setDocumentInfo] = useState({ projectProcessNum: processNumber, description: '', newFileNum: null, oldFileNum: -1 })

  const { data: documentDetailInfo } = useDocumentDetailData(documentNum)
  const documentEditMutation = useDocumentEditMutation()

  useEffect(() => {
    if (!!documentDetailInfo) {
      setUploadFiles([documentDetailInfo.fileInfoResponse])
      setDocumentInfo((prev) => {
        return { ...prev, description: documentDetailInfo.description, oldFileNum: documentDetailInfo.fileInfoResponse.fileNumber }
      })
    }
  }, [documentDetailInfo])

  useEffect(() => {
    if (uploadFiles.length > 0) {
      if (documentInfo.oldFileNum !== uploadFiles[0].fileNumber) {
        setDocumentInfo((prev) => {
          return { ...prev, newFileNum: uploadFiles[0].fileNumber }
        })
      }
    }
  }, [uploadFiles])

  const isSaveDisabled = useMemo(() => {
    if (uploadFiles.length === 0) {
      return true
    }
    if (documentInfo.description !== documentDetailInfo.description || documentInfo.newFileNum !== null) {
      return false
    }
    return true
  }, [documentDetailInfo, documentInfo, uploadFiles])

  const handleDescriptionChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setDocumentInfo((prev) => {
      return { ...prev, description: e.target.value }
    })
  }, [])

  const handleCancel = useCallback(() => {
    onClose('cancel')
  }, [onClose])

  const handleEdit = useCallback(() => {
    setDocumentEdit(true)
  }, [setDocumentEdit])

  const handleSave = useCallback(() => {
    documentEditMutation.mutate(documentInfo, {
      onSuccess(data, variables, context) {
        toastOpen({ content: 'Successfully saved.', icon: 'success' })
        onClose('save')
      },
      onError(error, variables, context) {
        toastOpen({ content: 'Save failed.', icon: 'warning' })
      },
    })
  }, [documentEditMutation, documentInfo, onClose, toastOpen])

  return (
    <>
      {!isDocumentEdit && (
        <div className="bg_second50 pd_20 round8">
          <DetailTable
            colgroup={
              <colgroup>
                <col style={{ width: '180px' }} />
                <col style={{ width: 'auto' }} />
              </colgroup>
            }
          >
            <tr>
              <th>
                <span className="navy300">ID</span>
              </th>
              <td className="pr_0">
                <span className="body1 navy600">{documentDetailInfo?.fileInfoResponse.fileNumber}</span>
              </td>
            </tr>
            <tr>
              <th className="va_top pt_18">
                <span className="navy300">Oligo design document file</span>
              </th>
              <td className="pr_0">
                <FileUpload
                  isDragActive={isDragActive}
                  drmValid={drmValid}
                  setDrmValid={setDrmValid}
                  removeRef={removeRef}
                  dropRef={dropRef}
                  fileInputRef={fileInputRef}
                  getfileSize={getfileSize}
                  removeUploadCard={removeUploadCard}
                  changeFileInput={changeFileInput}
                  uploadFiles={uploadFiles}
                  disabled={true}
                  customFormat="Capacity : Up to 500MB"
                />
              </td>
            </tr>
            <tr>
              <th className="va_top">
                <span className="navy300">Description</span>
              </th>
              <td className="va_top pr_0">
                {documentDetailInfo?.description.length > 0 ? <PreTypo className="body1 navy600">{documentDetailInfo?.description}</PreTypo> : '-'}
              </td>
            </tr>
            <tr>
              <th>
                <span className="navy300">Uploader</span>
              </th>
              <td className="pr_0">
                <span className="body1 navy600">{documentDetailInfo?.usrNm}</span>
              </td>
            </tr>
            <tr>
              <th>
                <span className="navy300">Date</span>
              </th>
              <td className="pr_0">
                <span className="body1 navy600">{changeTimeLocal({ time: documentDetailInfo?.mdfDt, type: 'yyyy-MM-dd' })}</span>
              </td>
            </tr>
          </DetailTable>
        </div>
      )}
      {isDocumentEdit && (
        <DetailTable
          colgroup={
            <colgroup>
              <col style={{ width: '180px' }} />
              <col style={{ width: 'auto' }} />
            </colgroup>
          }
        >
          <tr>
            <th className="pt_0">ID</th>
            <td className="pr_0 pt_0">
              <BaseInput disabled value={documentDetailInfo?.fileInfoResponse.fileNumber} />
            </td>
          </tr>
          <tr>
            <th className="va_top pt_20">Oligo design document file</th>
            <td className="pr_0">
              <FileUpload
                dropRef={dropRef}
                fileInputRef={fileInputRef}
                getfileSize={getfileSize}
                removeUploadCard={removeUploadCard}
                changeFileInput={changeFileInput}
                uploadFiles={uploadFiles}
                customFormat="Capacity : Up to 500MB"
              />
            </td>
          </tr>
          <tr>
            <th className="va_top">Description</th>
            <td className="pr_0">
              <TextArea
                value={documentInfo.description}
                onChange={handleDescriptionChange}
                maxLength={500}
                height="h148"
                placeholder="Please enter a description for the file."
              />
            </td>
          </tr>
          <tr>
            <th>Uploader</th>
            <td className="pr_0">
              <BaseInput disabled value={documentDetailInfo?.usrNm} />
            </td>
          </tr>
          <tr>
            <th>Date</th>
            <td className="pr_0">
              <BaseInput disabled value={changeTimeLocal({ time: documentDetailInfo?.mdfDt, type: 'yyyy-MM-dd' })} />
            </td>
          </tr>
        </DetailTable>
      )}
      <div className="align center mt_20">
        <ButtonMui size="xlarge" type="outlined" onClick={handleCancel}>
          Cancel
        </ButtonMui>
        {!isDocumentEdit && (
          <ButtonMui size="xlarge" onClick={handleEdit} disabled={!getMGAuth(projectInfo, processCode) && userInfo?.usrUid !== documentDetailInfo?.usrUid}>
            Edit
          </ButtonMui>
        )}
        {isDocumentEdit && (
          <ButtonMui size="xlarge" onClick={handleSave} disabled={isSaveDisabled}>
            Save
          </ButtonMui>
        )}
      </div>
    </>
  )
}
