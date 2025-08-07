import { useCallback, useEffect, useState } from 'react'
import { useQueries } from '@tanstack/react-query'
import { useDragFileUpload, getCode, useParamsData, FileListDataType } from 'library'
import { SelectMui, ButtonMui, SelectChangeEvent, DetailTable, InputLabel } from 'ui'
import { FileUpload } from 'ui/molecules'
import { useAddDocumentMutation } from '@store/server/useProjectQuery'
import { useToastPopup } from 'library/hook/useToastPopup'

export default function UploadFile({ onClose, processNumber }: { processNumber: number; onClose: (type?: string) => void }) {
  const { dropRef, fileInputRef, count, getfileSize, removeUploadCard, isDragActive, changeFileInput, uploadFiles, drmValid, setDrmValid, removeRef } =
    useDragFileUpload({
      tableName: 'TPJ_PRJ_FL',
    })
  const commonCodes = { projectFileType: 'PFM024' }
  const codes = useQueries({
    queries: Object.values(commonCodes).map((v) => {
      return { queryKey: ['code', v], queryFn: () => getCode(v), staleTime: Infinity }
    }),
  })
  let cCode = {}
  Object.keys(commonCodes).forEach((v, i) => {
    cCode[v] = codes[i].data
  })

  const { toastOpen } = useToastPopup()
  const [documentInfo, setDocumentInfo] = useState<{ projectProcessNum: number; fileType: string; fileNum: number }>({
    projectProcessNum: processNumber,
    fileType: '',
    fileNum: -1,
  })
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
    onClose('cancel')
  }, [onClose])

  const handleSave = useCallback(() => {
    addDocument.mutate(documentInfo, {
      onSuccess(data, variables, context) {
        toastOpen({ content: 'Successfully upload.', icon: 'success' })
        onClose('save')
      },
      onError(error, variables, context) {
        toastOpen({ content: 'Upload failed.', icon: 'warning' })
      },
    })
  }, [addDocument, documentInfo, toastOpen, onClose])

  const handleFileTypeChange = useCallback((event: SelectChangeEvent) => {
    setDocumentInfo((prev) => {
      return { ...prev, fileType: event.target.value }
    })
  }, [])

  return (
    <>
      <DetailTable
        colgroup={
          <colgroup>
            <col style={{ width: 'auto' }} />
            <col style={{ width: '460px' }} />
          </colgroup>
        }
      >
        <tr>
          <th className="pt_0">
            <InputLabel labelText="File type" />
          </th>
          <td className="pt_0 pr_0">
            <SelectMui
              size="full"
              options={cCode['projectFileType']}
              placeholder="Please select file type."
              onChange={handleFileTypeChange}
              value={documentInfo.fileType}
            />
          </td>
        </tr>
        <tr>
          <th className="va_top pt_18">
            <InputLabel labelText="Upload file" />
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
              customFormat="Capacity : Up to 500MB"
            />
          </td>
        </tr>
      </DetailTable>
      <div className="align center mt_20">
        <ButtonMui size="xlarge" type="outlined" onClick={handleCancel}>
          Cancel
        </ButtonMui>
        <ButtonMui size="xlarge" onClick={handleSave} disabled={documentInfo.fileNum < 0 || documentInfo.fileType === ''}>
          Upload
        </ButtonMui>
      </div>
    </>
  )
}
