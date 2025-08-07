'use client'
import { changeCodeToNameNoti } from '@constant/notificationOption'
import { NotificationDetail } from '@type/notification/notificationType'
import { useSearchParams } from 'next/navigation'
import { DetailTable } from 'ui'

const DetailBasicInfo = ({ notiData }) => {
  const notiId = useSearchParams().get('notiId')
  const basicInformation: NotificationDetail = notiData

  return (
    <article>
      <div className="cont_box_title">
        <p className="title1">Basic Information</p>
      </div>
      {basicInformation && (
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
            <th>No.</th>
            <td>{notiId}</td>
            <th />
          </tr>
          <tr>
            <th>Notification type</th>
            <td>{changeCodeToNameNoti(basicInformation.notificationTypeCode)}</td>
            <th>Title</th>
            <td>{basicInformation.title}</td>
          </tr>
          <tr>
            <th>Code</th>
            <td>{basicInformation.notificationCode}</td>
            <th>Path parameter</th>
            <td>{basicInformation.landingUrl}</td>
          </tr>
        </DetailTable>
      )}
    </article>
  )
}
export default DetailBasicInfo
