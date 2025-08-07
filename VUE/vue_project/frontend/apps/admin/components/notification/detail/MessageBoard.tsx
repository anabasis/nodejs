import { getCommonLanguageList } from '@api/common'
import { NotificationMultiLanguage } from '@type/notification/notificationType'
import { useEffect, useState } from 'react'
import { BoardTable } from 'ui'

const MessageBoard = ({ notiData }) => {
  const [languageCode, setLanguageCode] = useState([])

  const init = () => {
    getCommonLanguageList().then((response) => {
      setLanguageCode(response)
    })
  }
  useEffect(() => {
    init()
  }, [])

  const languageCodes = notiData?.notificationMultiLanguage?.map((data) => data.languageCode)

  // 언어 코드를 매핑된 이름으로 변환
  const languageNames = languageCodes?.map((code) => {
    const language = languageCode.find((lang) => lang.languageCode === code)
    return language ? language.languageName : code
  })

  return (
    <BoardTable>
      <colgroup>
        <col style={{ width: '25%' }} />
        <col style={{ width: 'auto' }} />
      </colgroup>
      <thead>
        <tr>
          <th>Language</th>
          <th>String</th>
        </tr>
      </thead>
      <tbody>
        {notiData?.notificationMultiLanguage?.map((noti: NotificationMultiLanguage, index) => {
          return (
            <tr key={index}>
              <td>{languageNames[index]}</td>
              <td>{noti.text}</td>
            </tr>
          )
        })}
      </tbody>
    </BoardTable>
  )
}

export default MessageBoard
