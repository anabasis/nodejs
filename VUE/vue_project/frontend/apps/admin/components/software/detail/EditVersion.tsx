import { getSoftwareHistoryVersion, modifyVersion } from '@api/software'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { EditSoftwareVersion, SoftwareHistoryContent } from '@type/software/softwareType'
import { softwareFileExtension, useDragFileUpload } from 'library'
import { useToastPopup } from 'library/hook/useToastPopup'
import { useEffect, useState } from 'react'
import { BaseInput, ButtonMui, DetailTable, FileUpload, TextArea } from 'ui'

//소프트웨어 버전 수정(versionPopup의 Edit[btn])
const EditVersion = ({
  setCurrentIndex,
  setUpdate,
  detailData,
  setDetailVersion,
}: {
  setCurrentIndex
  setUpdate
  detailData: SoftwareHistoryContent
  setDetailVersion
}) => {
  const { toastOpen, getToastState } = useToastPopup()

  const { mutate: modifySoftwareVersion, isLoading: modifyIsLoding } = useMutation(modifyVersion, {
    onSuccess: () => {
      queryClient.invalidateQueries(['history'])
      toastOpen(getToastState({ content: 'Successfully saved.', icon: 'success' }))
      handleVersionClick(newEditVersion.softwareReleaseNumber)
    },
    onError: () => {
      toastOpen(getToastState({ content: 'Save failed.', icon: 'warning' }))
      back()
    },
  })

  const back = () => {
    setCurrentIndex(1)
    setUpdate((prev) => !prev)
  }

  const [editVersion, setEditVersion] = useState<SoftwareHistoryContent>(detailData)
  const [newEditVersion, setNewEditVersion] = useState<EditSoftwareVersion>({
    softwareReleaseNumber: detailData.softwareReleaseNumber,
    version: detailData.version,
    releaseNote: detailData.releaseNote,
    fileNumber: null,
  })
  const queryClient = useQueryClient()

  const { dropRef, fileInputRef, setUploadFiles, isDragActive, getfileSize, removeUploadCard, changeFileInput, uploadFiles } = useDragFileUpload({
    tableName: 'TSW_SW_RELS',
    fileValidReg: softwareFileExtension,
  })

  const handleChange = (event) => {
    const { name, value } = event.target

    setNewEditVersion({
      ...newEditVersion,
      [name]: value,
    })
  }

  const handleVersionChange = (event) => {
    const { name, value } = event.target

    setNewEditVersion({
      ...newEditVersion,
      [name]: value.replace(/(\s*)/g, ''), //version 숫자 모든 공백 제거
    })
  }

  useEffect(() => {
    setUploadFiles([{ ...detailData.softwareFileResponse }])
  }, [])

  useEffect(() => {
    setNewEditVersion({
      ...newEditVersion,
      fileNumber: uploadFiles[0]?.fileNumber ?? null,
    })
  }, [uploadFiles])

  const handleVersionClick = async (releaseNumber: number) => {
    const detailData: SoftwareHistoryContent = await getSoftwareHistoryVersion({ releaseNumber })
    setDetailVersion(detailData)
    back()
  }

  const isValid = () => {
    return (
      uploadFiles[0]?.displayFileName === undefined ||
      newEditVersion.version === '' ||
      newEditVersion.releaseNote === '' || //다 필수값
      (editVersion?.softwareFileResponse?.fileNumber === uploadFiles[0]?.fileNumber &&
        editVersion?.version === newEditVersion.version &&
        editVersion?.releaseNote === newEditVersion.releaseNote)
    )
  }
  const formLength = newEditVersion.version.length > 16 || newEditVersion.releaseNote.length > 500

  return (
    <>
      {detailData && (
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
              <th className="vt">App File</th>
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
                  placeholder="N.NN.NNN"
                  onChange={(event) => handleVersionChange(event)}
                  value={newEditVersion?.version}
                  maxLength={16}
                />
              </td>
            </tr>
            <tr>
              <th className="vt">Release note</th>
              <td className="pr_0">
                <TextArea
                  name="releaseNote"
                  placeholder="Please enter description."
                  onChange={(event) => handleChange(event)}
                  value={newEditVersion?.releaseNote}
                  maxLength={500}
                />
              </td>
            </tr>
          </DetailTable>
          <div className="align center mt_30">
            <ButtonMui
              type="outlined"
              size="xlarge"
              onClick={() => {
                back()
              }}
            >
              Cancel
            </ButtonMui>
            <ButtonMui
              disabled={isValid() || formLength}
              size="xlarge"
              isLoading={modifyIsLoding}
              onClick={() => {
                setCurrentIndex(1)
                modifySoftwareVersion({ newEditVersion })
              }}
            >
              Save
            </ButtonMui>
          </div>
        </>
      )}
    </>
  )
}
export default EditVersion
