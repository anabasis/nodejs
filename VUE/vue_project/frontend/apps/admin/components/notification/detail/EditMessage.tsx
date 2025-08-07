import { getCommonLanguageList } from '@api/common'
import { notificationBasicAtom } from '@store/client/notification'
import { NotificationMultiLanguage } from '@type/notification/notificationType'
import { useAtom } from 'jotai'
import { ModalType } from 'library'
import { useModal } from 'library/hook/useModal'
import { useEffect, useState } from 'react'
import { ButtonMui, DetailTable, SelectMui, TextArea } from 'ui'
import MessagePopup from './MessagePopup'

//알림관리 언어별 메세지 수정(versionPopup의 Edit[btn])
const EditMessage = ({ langData, langName }: { langData: NotificationMultiLanguage; langName: string }) => {
  const { modalClose } = useModal()
  const [languageCode, setLanguageCode] = useState([])

  const [newLang, setNewLang] = useState(langData?.text)
  //jotai
  const [notiFormAtom, setNotiFormAtom] = useAtom(notificationBasicAtom)

  //Language Detail
  const detailModal = (noti: NotificationMultiLanguage): ModalType => ({
    maxWidth: 'm',
    title: 'Notification details by language',
    textTitle: 'Check notification contents by language.',
    linetitle: true,
    content: <MessagePopup noti={noti} />,
  })

  useEffect(() => {
    getCommonLanguageList().then((response) => {
      setLanguageCode(response)
    })
  }, [])

  const transformedArray = languageCode.map((item) => ({ value: item.languageCode, name: item.languageName }))
  const language = transformedArray.filter((item) => item.value === langData.languageCode)

  //폼 필드 값 변경되면 상태 업데이트
  const handleUpdateForm = (event) => {
    const { name, value } = event.target

    if (name === 'text') {
      const updatedResponses = notiFormAtom?.notificationMultiLanguage.map((response) => {
        if (response.languageCode === langData.languageCode) {
          return { ...response, text: value }
        }

        return response
      })
      setNotiFormAtom((prev) => ({
        ...prev,
        notificationMultiLanguage: updatedResponses,
      }))
    } else {
      // 다른 폼 필드의 업데이트 처리
      setNotiFormAtom((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  //Edit popup에서 취소 클릭 시 작성된 text rollback
  const handleCancelUpdateForm = () => {
    const updatedResponses = notiFormAtom?.notificationMultiLanguage.map((response) => {
      if (response.languageCode === langData.languageCode) {
        return { ...response, text: langData?.text }
      }
      return response
    })
    setNotiFormAtom((prev) => ({
      ...prev,
      notificationMultiLanguage: updatedResponses,
    }))
  }

  return (
    <>
      {langData && (
        <>
          <DetailTable
            colgroup={
              <colgroup>
                <col style={{ width: '30%' }} />
                <col style={{ width: 'auto' }} />
              </colgroup>
            }
          >
            <tr>
              <th>Language</th>
              <td className="pr_0">
                <SelectMui size="full" options={transformedArray} placeholder={language[0]?.name} disabled />
              </td>
            </tr>

            <tr>
              <th className="vt">String</th>
              <td className="pr_0">
                <TextArea
                  name="text"
                  placeholder="Please enter the string in the language of your choice."
                  value={newLang}
                  onChange={(event) => {
                    setNewLang(event.target.value)
                    handleUpdateForm(event)
                  }}
                  maxLength={500}
                />
              </td>
            </tr>
          </DetailTable>
          <div className="align center mt_30">
            <ButtonMui
              type="outlined"
              size="xlarge"
              onClick={() => {
                handleCancelUpdateForm()
                modalClose()
                // modalOpen(detailModal(langData)) Edit창에서 cancel 클릭 -> detail 창 이동
              }}
            >
              Cancel
            </ButtonMui>
            <ButtonMui
              disabled={langData.text === newLang || newLang.length === 0}
              size="xlarge"
              onClick={() => {
                modalClose()
                // modalOpen(detailModal({ languageCode: langData.languageCode, text: newLang })) Edit창에서 save 클릭 -> detail 창 이동(변경한내용저장된상태)
              }}
            >
              Save
            </ButtonMui>
          </div>
        </>
      )}
    </>
  )
}
export default EditMessage
