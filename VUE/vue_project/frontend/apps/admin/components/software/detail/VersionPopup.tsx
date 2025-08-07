import { SoftwareHistoryContent } from '@type/software/softwareType'
import { softwareFileExtension, useDragFileUpload, useMenu } from 'library'
import { useModal } from 'library/hook/useModal'
import { changeTimeLocal } from 'library/util'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { ButtonMui, DetailTable, FileUpload, PreTypo } from 'ui'

const VersionPopup = ({ setCurrentIndex, detailData }: { setCurrentIndex?; detailData: SoftwareHistoryContent }) => {
  const pathname = usePathname()
  const { getPathInfo } = useMenu()

  const { modalOpen, modalClose } = useModal()

  const { dropRef, fileInputRef, isDragActive, setUploadFiles, getfileSize, removeUploadCard, changeFileInput, uploadFiles } = useDragFileUpload({
    tableName: 'TSW_SW_RELS',
    fileValidReg: softwareFileExtension,
  })

  useEffect(() => {
    setUploadFiles([{ ...detailData?.softwareFileResponse }])
  }, [detailData])

  return (
    <>
      {detailData && (
        <>
          <div className="bg_box">
            <DetailTable
              colgroup={
                <colgroup>
                  <col style={{ width: '20%' }} />
                  <col style={{ width: '80%' }} />
                </colgroup>
              }
            >
              <tr>
                <th className="va_top pt_20">
                  <span className="navy300 body2">App file</span>
                </th>
                <td>
                  <FileUpload
                    isDragActive={isDragActive}
                    disabled={true}
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
                <th>
                  <span className="navy300 body2">Version</span>
                </th>
                <td>
                  <PreTypo className="body1 navy600 max_h160 ovf_a">{detailData.version}</PreTypo>
                </td>
              </tr>
              <tr>
                <th>
                  <span className="navy300 body2">Release date</span>
                </th>
                <td>
                  <p className="body1 navy600 max_h160 ovf_a">{changeTimeLocal({ time: detailData.createDate, type: 'yyyy-MM-dd' })}</p>
                </td>
              </tr>
              <tr>
                <th>
                  <span className="navy300 body2">Release note</span>
                </th>
                <td>
                  <p className="body1 navy600 max_h160 ovf_a">
                    {detailData.releaseNote?.split('\n').map((line, innerIndex) => {
                      return (
                        <span key={innerIndex}>
                          {line}
                          <br />
                        </span>
                      )
                    })}
                  </p>
                </td>
              </tr>
            </DetailTable>
          </div>
          <div className="align center mt_30">
            <ButtonMui type="outlined" size="xlarge" onClick={() => modalClose()}>
              Cancel
            </ButtonMui>
            <ButtonMui
              size="xlarge"
              onClick={() => {
                modalClose()
                setCurrentIndex(2)
              }}
              disabled={getPathInfo(pathname).crtYn !== 'Y'}
            >
              Edit
            </ButtonMui>
          </div>
        </>
      )}
    </>
  )
}
export default VersionPopup
