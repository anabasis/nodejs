import { corporateLevelState } from 'lib/constant/corporateOption'
import { Corporate, CorporateBasicInfo } from 'lib/type/corporate/corporateType'
import { changeTimeLocal } from 'library/util'
import { DetailTable, InputLabel, SwitchToggle } from 'ui'

const BasicInformation = ({ basicInfo }: { basicInfo: Corporate & CorporateBasicInfo }) => {
  //Board에서 받아온 id를 prop으로 받아서 data뿌리기
  return (
    <>
      {basicInfo && (
        <DetailTable
          colgroup={
            <colgroup>
              <col width="180px" />
              <col width="auto" />
              <col width="180px" />
              <col width="auto" />
            </colgroup>
          }
        >
          <tr>
            <th>
              <InputLabel labelText="No." />
            </th>
            <td>{basicInfo.corporationNum}</td>
          </tr>
          <tr>
            <th>
              <InputLabel labelText="Corporate level" />
            </th>
            <td>{corporateLevelState[basicInfo.corporateLevelCode]}</td>
            {/* 기업유형(level2)과할레벨(B)로 분리됨 기업유형 내에서도 기업에 따라 역할을 나눌 경우를 대비해 추가해둔 구분자. 추후 c,d 드롭박스로 생길예정 */}
            <th>
              <InputLabel labelText="Role level" />
            </th>
            <td>{basicInfo.roleLevel}</td>
          </tr>
          <tr>
            <th>
              <InputLabel labelText="Corporate name" />
            </th>
            <td>{basicInfo.corporationName}</td>
            <th>
              <InputLabel labelText="Status" />
            </th>
            <td>{basicInfo.corporateStatusCode}</td>
          </tr>
          <tr>
            <th>
              <InputLabel labelText="Domain information" />
            </th>
            <td>{basicInfo.domain}</td>
            <th>
              <InputLabel labelText="Country" />
            </th>
            <td>{basicInfo.nation}</td>
          </tr>
          <tr>
            <th>
              <InputLabel labelText="Contact" />
            </th>
            <td>{basicInfo.representativeEmailAddress}</td>
            <th>
              <InputLabel labelText="Representative(Seegene)" />
            </th>
            <td>{basicInfo.managerUserId}</td>
          </tr>
          <tr>
            <th>
              <InputLabel labelText="Date of registration" />
            </th>
            <td>{changeTimeLocal({ time: basicInfo.createDate })}</td>
            <th>
              <InputLabel labelText="Corporate members" />
            </th>
            <td>{basicInfo.memberCount} Members</td>
          </tr>
          <tr>
            <th>
              <InputLabel labelText="Two-factor authentication" />
            </th>
            <td colSpan={3}>
              <SwitchToggle disabled value={basicInfo.otpAuthYn === 'Y'} color="primary" text="ON" />
            </td>
          </tr>
          <tr>
            <th>
              <InputLabel labelText="Description" />
            </th>
            <td colSpan={3}>
              {basicInfo.description?.split('\n').map((line, innerIndex) => {
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
    </>
  )
}

export default BasicInformation
