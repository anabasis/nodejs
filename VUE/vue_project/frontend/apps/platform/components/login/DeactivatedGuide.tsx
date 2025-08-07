import { DetailTable, InputLabel } from 'ui'

/**
 * 화면: LG3.1 휴면 계정 해제의 content
 * 기능: 휴면 계정 해제 안내
 */

interface DeactivatedGuideProps {
  lastAccessDate: string
  deactivationDate: string
}

const DeactivatedGuide = (props: DeactivatedGuideProps) => {
  const { lastAccessDate, deactivationDate } = props
  return (
    <div className="cont_title_box">
      <p className="title3">
        In accordance with the Personal Information Protection Act, <br />
        your account has been deactivated because you have not logged in to the system for more than a 365 days. <br />
        But if you wnat to activate account please click the [Next] button.
      </p>
      <div className="bg_box mt_20 grid12">
        <DetailTable
          colgroup={
            <colgroup>
              <col style={{ width: '30%' }} />
              <col style={{ width: '70%' }} />
            </colgroup>
          }
        >
          {/* 마지막 접속일 */}
          <tr>
            <th className="body2 navy300">Last access date</th>
            <td className="body1 navy800">{lastAccessDate}</td>
          </tr>
          {/* 휴면 상태 전환일 */}
          <tr>
            <th className="body2 navy300">Account deactivation date</th>
            <td className="navy800">{deactivationDate}</td>
          </tr>
          {/* 분리 보관 항목 */}
          <tr>
            <th className="va_top pt_9 body2 navy300">Segregated safekeeping item</th>
            <td className="body1 navy800">
              All information collected/managed by system. <br />
              Email, Password, Position, Job title, Etc.
            </td>
          </tr>
          {/* 관련 법령 */}
          <tr>
            <th className="body2 navy300">Related laws</th>
            <td className="body1 navy800">Article 39-6 of the Personal Information Protection Act (Special Case for Destruction of Personal Information)</td>
          </tr>
        </DetailTable>
      </div>
    </div>
  )
}

export default DeactivatedGuide
