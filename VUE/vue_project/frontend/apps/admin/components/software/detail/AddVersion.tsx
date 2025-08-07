import { newVersionAtom } from '@store/client/software'
import { useSoftwareMutation } from '@store/server/useSoftwareQuery'
import { useAtomValue, useSetAtom } from 'jotai'
import { softwareFileExtension, useDragFileUpload } from 'library'
import { useModal } from 'library/hook/useModal'
import { useEffect } from 'react'
import { BaseInput, ButtonMui, DetailTable, FileUpload, TextArea } from 'ui'

//소프트웨어 버전 등록(VersionRegistration Add[btn])
const AddVersion = ({ appsId }) => {
  const { modalClose } = useModal()
  const { addVersionMutation } = useSoftwareMutation()

  const { dropRef, fileInputRef, isDragActive, getfileSize, removeUploadCard, changeFileInput, uploadFiles } = useDragFileUpload({
    tableName: 'TSW_SW_RELS',
    fileValidReg: softwareFileExtension,
  })

  const newVersion = useAtomValue(newVersionAtom)
  const setVersion = useSetAtom(newVersionAtom)

  const handleUpdateForm = (event) => {
    const { name, value } = event.target

    if (name === 'version') {
      setVersion((prev) => ({
        ...prev,
        [name]: value.replace(/(\s*)/g, ''), //version 숫자 모든 공백 제거
      }))
    } else {
      setVersion((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  useEffect(() => {
    setVersion((prev) => ({
      ...prev,
      softwareNumber: appsId,
      fileNumber: uploadFiles[0]?.fileNumber ?? null,
    }))
  }, [uploadFiles])

  // 소프트웨어 버전 등록 api

  const isValid =
    newVersion.version.length === 0 ||
    newVersion.releaseNote.length === 0 ||
    newVersion.version.length > 16 ||
    newVersion.releaseNote.length > 500 ||
    !uploadFiles[0]

  return (
    <>
      <DetailTable
        colgroup={
          <colgroup>
            <col width="20%" />
            <col width="*" />
          </colgroup>
        }
      >
        <tr>
          <th className="va_top">App file</th>
          <td className="pr_0">
            <FileUpload
              isDragActive={isDragActive}
              dropRef={dropRef}
              fileInputRef={fileInputRef}
              getfileSize={getfileSize}
              removeUploadCard={removeUploadCard}
              changeFileInput={changeFileInput}
              uploadFiles={uploadFiles}
              customFormat="File format : zip / Capacity : Up to 500MB"
              inputAccept=".zip"
            />
          </td>
        </tr>
        <tr>
          <th>Version</th>
          <td className="pr_0">
            <BaseInput
              name="version"
              onChange={(event) => {
                handleUpdateForm(event)
              }}
              placeholder="N.NN.NNN"
              maxLength={16}
            />
          </td>
        </tr>
        <tr>
          <th className="vt">Release note</th>
          <td className="pr_0">
            <TextArea name="releaseNote" height={150} onChange={handleUpdateForm} placeholder="Please enter description." maxLength={500} />
          </td>
        </tr>
      </DetailTable>
      <div className="align center mt_30">
        <ButtonMui type="outlined" size="xlarge" onClick={() => modalClose()}>
          Cancel
        </ButtonMui>
        <ButtonMui
          disabled={isValid}
          size="xlarge"
          onClick={() => {
            // handleAddSoftwareVersion()
            addVersionMutation({ newVersion })
          }}
        >
          Add
        </ButtonMui>
      </div>
    </>
  )
}
export default AddVersion
