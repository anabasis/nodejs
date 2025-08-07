'use client'

import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useDragFileUpload, useToastPopup } from 'library'
import { DetailTable, TextArea, ButtonMui } from 'ui'
import { FileUpload } from 'ui/molecules'
import { useAddDocumentMutation } from '@store/server/useProjectQuery'
import { AddDocumentType } from '@type/project/projectType'

export default function OligoDesignDocumentUpload({ onClose, processNumber }: { onClose: (result?: string) => void; processNumber: number }) {
  const { dropRef, fileInputRef, isDragActive, count, getfileSize, removeUploadCard, changeFileInput, uploadFiles, drmValid, setDrmValid, removeRef } =
    useDragFileUpload({
      tableName: 'TPJ_PRJ_FL',
    })

  const { toastOpen } = useToastPopup()
  const [documentInfo, setDocumentInfo] = useState<AddDocumentType>({ projectProcessNum: processNumber, fileType: null, fileNum: -1, description: '' })
  const [saveDisabled, setSaveDisabled] = useState(true)

  const addDocument = useAddDocumentMutation()

  useEffect(() => {
    if (uploadFiles.length > 0) {
      setDocumentInfo((prev) => {
        return { ...prev, fileNum: uploadFiles[0].fileNumber }
      })
      setSaveDisabled(false)
    } else {
      setSaveDisabled(true)
      setDocumentInfo((prev) => {
        return { ...prev, fileNum: -1 }
      })
    }
  }, [uploadFiles])

  const handleCancel = useCallback(() => {
    onClose()
  }, [onClose])

  const handleUpload = useCallback(() => {
    addDocument.mutate(documentInfo, {
      onSuccess(data, variables, context) {
        onClose('save')
        toastOpen({ content: 'Successfully upload.', icon: 'success' })
      },
      onError(error, variables, context) {
        toastOpen({ content: 'Upload failed.', icon: 'warning' })
      },
    })
  }, [addDocument, documentInfo, onClose, toastOpen])

  const handleDescriptionChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setDocumentInfo((prev) => {
      return { ...prev, description: e.target.value }
    })
  }, [])

  return (
    <>
      <DetailTable
        colgroup={
          <colgroup>
            <col style={{ width: '170px' }} />
            <col style={{ width: 'auto' }} />
          </colgroup>
        }
      >
        <tr>
          <th className="va_top">Upload file</th>
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
              customFormat="Capacity : Up to 500MB"
            />
          </td>
        </tr>
        <tr>
          <th className="va_top">Description</th>
          <td className="pr_0">
            <TextArea
              placeholder="Please enter a description for the file."
              onChange={handleDescriptionChange}
              value={documentInfo.description}
              maxLength={500}
              height="h148"
            />
          </td>
        </tr>
      </DetailTable>
      <div className="align center mt_20">
        <ButtonMui size="xlarge" type="outlined" onClick={handleCancel}>
          Cancel
        </ButtonMui>
        <ButtonMui size="xlarge" onClick={handleUpload} disabled={saveDisabled}>
          Upload
        </ButtonMui>
      </div>
    </>
  )
}
