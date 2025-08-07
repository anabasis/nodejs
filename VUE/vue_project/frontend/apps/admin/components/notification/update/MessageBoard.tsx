import { changeLanguage } from '@constant/commonCodeOption'
import { NotificationMultiLanguage } from '@type/notification/notificationType'
import { BoardTable, ButtonMui } from 'ui'

const MessageBoard = ({ notiData }) => {
  return (
    <BoardTable>
      <colgroup>
        <col style={{ width: '25%' }} />
        <col style={{ width: '60%' }} />
        <col style={{ width: '5%' }} />
      </colgroup>
      <thead>
        <tr>
          <th>Language</th>
          <th>String</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {notiData?.notificationMultiLanguage?.map((noti: NotificationMultiLanguage, index) => {
          return (
            <tr key={index}>
              <td>{changeLanguage(noti.languageCode)}</td>
              <td>{noti.text}</td>
              <td>
                <ButtonMui
                  type="text"
                  size="xsmall"
                  color="error"
                  icon="DeleteIcon"
                  iconStyle={{
                    width: 20,
                    height: 20,
                    fill: 'var(--navy800)',
                  }}
                  onClick={() => {}}
                />
              </td>
            </tr>
          )
        })}
      </tbody>
    </BoardTable>
  )
}

export default MessageBoard
