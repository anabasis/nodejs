import { CapFilmMasterDataDetail } from '@type/mater/masterDataType'
import { DetailTable, InputLabel } from 'ui/components'

const CapFilmDetail = ({ masterData }) => {
  const capFilmData: CapFilmMasterDataDetail = masterData

  return (
    <>
      <article>
        {/* 컨텐츠 간 간격은 article 로 묶습니다. */}
        <div className="cont_title_box">
          <div className="align start">
            <p className="title1 mr_10">Master Data Information</p>
          </div>
        </div>
        {capFilmData && (
          <DetailTable
            colgroup={
              <colgroup>
                <col style={{ width: '15%' }} />
                <col style={{ width: '35%' }} />
                <col style={{ width: '15%' }} />
                <col style={{ width: '35%' }} />
              </colgroup>
            }
          >
            <tr>
              <th>
                <InputLabel labelText="Cap/film name" id="ipt01" />
              </th>
              <td>{capFilmData.capFilmName}</td>
              <th>
                <InputLabel labelText="Display name" id="ipt01" />
              </th>
              <td>{capFilmData.displayName}</td>
            </tr>
            <tr>
              <th>
                <InputLabel labelText="Code" id="ipt01" />
              </th>
              <td>{capFilmData.classificationCode}</td>
              <th>
                <InputLabel labelText="Enable" id="ipt01" />
              </th>
              <td>
                <td>{capFilmData.enbleYn === 'Y' ? 'On' : 'Off'}</td>
              </td>
            </tr>
          </DetailTable>
        )}
      </article>
    </>
  )
}

export default CapFilmDetail
