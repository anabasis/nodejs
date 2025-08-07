import { useState } from 'react'
import { changeTimeLocal, getCdnFileUrl, getPrvFileUrl } from 'library/util'
import { ButtonMui, DetailTable, PreTypo } from 'ui'
import { FileResType } from 'library/type/common'

const VersionPopup = ({ detailData }) => {
  const [filePath, setFilePath] = useState('')

  const setFileUrl = (file: FileResType) => {
    if (!file) return null
    if (file.storageTypeCode === 'PRV') {
      getPrvFileUrl(file).then((res) => {
        setFilePath(res)
      })
    } else {
      setFilePath(getCdnFileUrl(file) ?? '')
    }
  }

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
                <th>
                  <span className="navy300 body2">App file</span>
                </th>
                <td onMouseEnter={() => setFileUrl(detailData?.softwareFileResponse)}>
                  <ButtonMui
                    uiType="etc"
                    className="round8"
                    color="black"
                    icon="FileDownloadIcon"
                    iconStyle={{ fill: 'var(--navy800)', width: 16, height: 16 }}
                    size="small"
                    type="outlined"
                  >
                    <a style={{ color: 'var(--navy800)' }} href={filePath} download target="_blank">
                      Download
                    </a>
                  </ButtonMui>
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
                  <p className="body1 navy600 max_h160 ovf_a">{detailData.releaseNote}</p>
                </td>
              </tr>
            </DetailTable>
          </div>
        </>
      )}
    </>
  )
}
export default VersionPopup
