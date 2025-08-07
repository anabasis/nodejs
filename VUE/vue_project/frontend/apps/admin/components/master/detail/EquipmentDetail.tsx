import { EquipmentMasterDataDetail } from '@type/mater/masterDataType'
import { DetailTable, InputLabel } from 'ui/components'

const EquipmentDetail = ({ masterData }) => {
  const equipmentData: EquipmentMasterDataDetail = masterData

  return (
    <article>
      {/* 컨텐츠 간 간격은 article 로 묶습니다. */}
      <div className="cont_title_box">
        <div className="align start">
          <p className="title1 mr_10">Master Data Information</p>
        </div>
      </div>
      {equipmentData && (
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
              <InputLabel labelText="Instrument name" />
            </th>
            <td>{equipmentData.instrmNm}</td>
            <th>
              <InputLabel labelText="Number of row" />
            </th>
            <td>{equipmentData.rowCnt}</td>
          </tr>
          <tr>
            <th>
              <InputLabel labelText="Number of colum" />
            </th>
            <td>{equipmentData.colCnt}</td>
            <th>
              <InputLabel labelText="Code" />
            </th>
            <td>{equipmentData.instrmCd}</td>
          </tr>
        </DetailTable>
      )}
    </article>
  )
}

export default EquipmentDetail
