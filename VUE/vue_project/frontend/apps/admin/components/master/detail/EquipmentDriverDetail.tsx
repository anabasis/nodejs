import { EquipmentDriverMasterDataDetail } from '@type/mater/masterDataType'
import { DetailTable, InputLabel } from 'ui/components'

const EquipmentDriverDetail = ({ masterData }) => {
  const equipDriverData: EquipmentDriverMasterDataDetail = masterData

  return (
    <>
      <article>
        {/* 컨텐츠 간 간격은 article 로 묶습니다. */}
        <div className="cont_title_box">
          <div className="align start">
            <p className="title1 mr_10">Master Data Information</p>
          </div>
        </div>
        {equipDriverData && (
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
            <tr id="tableHeader">
              <th>
                <InputLabel labelText="Instrument driver name" id="ipt01" />
              </th>
              <td>{equipDriverData.instrmDrvNm}</td>
              <th>
                <InputLabel labelText="Display name" id="ipt01" />
              </th>
              <td>{equipDriverData.dspNm}</td>
            </tr>
            <tr>
              <th>
                <InputLabel labelText="Supported well" id="ipt01" />
              </th>
              <td>{equipDriverData.suptWlCnt}</td>
              <th>
                <InputLabel labelText="Instrument driver ID" />
              </th>
              <td>{equipDriverData.instrmDrvId}</td>
            </tr>
            <tr>
              <th>
                <InputLabel labelText="Description" id="ipt01" />
              </th>
              <td colSpan={`tableHeader`.length}>
                {equipDriverData.dscrp.split('\n').map((line, innerIndex) => {
                  return (
                    <span key={innerIndex}>
                      {line}
                      <br />
                    </span>
                  )
                })}
              </td>
            </tr>
          </DetailTable>
        )}
      </article>
    </>
  )
}

export default EquipmentDriverDetail
