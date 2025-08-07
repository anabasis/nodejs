import { SoftwareBasicInfo } from '@type/software/softwareType'
import { getCdnFileUrl } from 'library/util'
import { AvatarMui, DetailTable, PreTypo } from 'ui'

const DetailBasicInfo = ({ basicInfo }: { basicInfo: SoftwareBasicInfo }) => {
  return (
    <article>
      <div className="cont_title_box">
        <p className="title1">Basic Information</p>
      </div>
      {basicInfo && (
        <DetailTable
          colgroup={
            <colgroup>
              <col width="15%" />
              <col width="35%" />
              <col width="15%" />
              <col width="35%" />
            </colgroup>
          }
        >
          <tr>
            <th>Icon</th>
            <td colSpan={3}>
              {/* 앱 이미지 아이콘 -> 컴포넌트로 변경 */}
              <div className="align start gap_10">
                <AvatarMui
                  size="medium"
                  type="circular"
                  data={[
                    {
                      src: basicInfo?.iconFile === null ? '/images/no_icon.png' : getCdnFileUrl(basicInfo.iconFile),
                      alt: 'Profile',
                    },
                  ]}
                />
              </div>
            </td>
          </tr>
          <tr>
            {/* <th>Launcher Icon</th>
            <td>{detail.id}</td> */}
            <th className="va_top">App name</th>
            <td className="va_top">{basicInfo.softwareName}</td>
            <th className="va_top">Type</th>
            <td className="va_top">{basicInfo.ivdRuoCode}</td>
          </tr>
          <tr>
            <th className="va_top pt_20">Description</th>
            <td colSpan={3} className="pt_20">
              <PreTypo>
                {basicInfo.description.split('\n').map((line, innerIndex) => {
                  return (
                    <span key={innerIndex}>
                      {line}
                      <br />
                    </span>
                  )
                })}
              </PreTypo>
            </td>
          </tr>
        </DetailTable>
      )}
    </article>
  )
}
export default DetailBasicInfo
