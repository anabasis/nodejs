import { getCommonLanguageList } from '@api/common'
import { NotificationMultiLanguage } from '@type/notification/notificationType'
import { ModalType, useModal } from 'library/hook/useModal'
import { useEffect, useState } from 'react'
import { ButtonMui, DetailTable, PreTypo } from 'ui'
import EditMessage from './EditMessage'
import EditMessageEtc from './EditMessageEtc'

//Edit page -> string By Language -> detail
const MessagePopup = ({ noti }: { noti: NotificationMultiLanguage }) => {
  const [langData, setLangData] = useState<NotificationMultiLanguage>(noti)
  const [languageCode, setLanguageCode] = useState([])
  const { modalOpen, modalClose } = useModal()

  const modalState = (langData: NotificationMultiLanguage, name): ModalType => ({
    title: 'Edit message by notification language',
    textTitle: <span>Edit string by each language.</span>,
    linetitle: true,
    maxWidth: 'm',
    content: <EditMessage langData={langData} langName={language[0]?.languageName} />,
  })
  const modalStateEtc = (langData: NotificationMultiLanguage, name): ModalType => ({
    title: 'Edit message by notification language',
    textTitle: <span>Edit string by each language.</span>,
    linetitle: true,
    maxWidth: 'm',
    content: <EditMessageEtc langData={langData} langName={language[0]?.languageName} />,
  })

  useEffect(() => {
    getCommonLanguageList().then((response) => {
      setLanguageCode(response)
    })
  }, [])

  //언어코드 api 이름이랑 매핑
  const language = languageCode.filter((item) => item.languageCode === langData.languageCode)

  return (
    <>
      {noti && (
        <>
          <div className="bg_box">
            <DetailTable
              colgroup={
                <colgroup>
                  <col style={{ width: '30%' }} />
                  <col style={{ width: 'auto' }} />
                </colgroup>
              }
            >
              <tr>
                <th className="">
                  <span className="body2 navy300">Language</span>
                </th>
                <td>
                  <p className="body1 navy600">{language[0]?.languageName}</p>
                </td>
              </tr>

              <tr>
                <th className="va_top pt_10">
                  <span className="body2 navy300">String</span>
                </th>
                <td>
                  <PreTypo className="body1 navy600">{noti.text}</PreTypo>
                </td>
              </tr>
            </DetailTable>
          </div>
          <div className="align center mt_30">
            <ButtonMui type="outlined" size="xlarge" onClick={() => modalClose()}>
              Cancel
            </ButtonMui>
            <ButtonMui
              size="xlarge"
              onClick={() => {
                if (noti.languageCode === 'en') {
                  return modalClose(1), modalOpen(modalState(noti, name))
                } else {
                  return modalClose(1), modalOpen(modalStateEtc(noti, name))
                }
              }}
            >
              Edit
            </ButtonMui>
          </div>
        </>
      )}
    </>
  )
}
export default MessagePopup
