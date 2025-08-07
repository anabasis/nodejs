import { getCommonLanguageList } from '@api/common'
import { newListAtom, notificationBasicAtom } from '@store/client/notification'
import { NotificationMultiLanguage } from '@type/notification/notificationType'
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import { ModalType, useModal } from 'library'
import { useEffect, useState } from 'react'
import { ButtonMui, DetailTable, SelectMui, TextArea } from 'ui'
import MessagePopup from './MessagePopup'

//알림관리 언어별 메세지 수정(versionPopup의 Edit[btn])
const EditMessageEtc = ({ langData, langName }: { langData: NotificationMultiLanguage; langName: string }) => {
  const { modalClose } = useModal()

  const [newLang, setNewLang] = useState(langData?.text)
  //jotai
  const [notiFormAtom, setNotiFormAtom] = useAtom(notificationBasicAtom)

  const setList = useSetAtom(newListAtom)
  const newList = useAtomValue(newListAtom)

  const [languageCode, setLanguageCode] = useState([])

  useEffect(() => {
    getCommonLanguageList().then((response) => {
      setLanguageCode(response)
    })
  }, [])

  //Cancel클릭 시 바로 전 데이터로 롤백
  const rollbackAtom = atom<{ languageCode: string; text: string }>({
    languageCode: 'ko',
    text: langData?.text,
  })

  //Language Detail
  const detailModal = (noti: NotificationMultiLanguage): ModalType => ({
    maxWidth: 'm',
    title: 'Notification details by language',
    textTitle: 'Check notification contents by language.',
    linetitle: true,
    content: <MessagePopup noti={noti} />,
  })

  // 폼 필드 값 변경되면 상태 업데이트
  const handleUpdateForm = (event) => {
    const { name, value } = event.target

    if (name === 'text') {
      //Edit페이지에서 추가 후 수정할때
      if (newList.length !== 0) {
        const updatedNewList = newList.map((item) => {
          if (item.languageCode === langData.languageCode) {
            return {
              ...item,
              text: value,
            }
          }
          return item
        })
        // 업데이트된 리스트를 atom에 설정
        setList(updatedNewList)
      }
      //기 존재 데이터를 Edit페이지에서 수정할때
      const updatedExistList = notiFormAtom.notificationMultiLanguage.map((item) => {
        if (item.languageCode === langData.languageCode) {
          return {
            ...item,
            text: value,
          }
        }
        return item
      })
      setNotiFormAtom((prev) => ({
        ...prev,
        notificationMultiLanguage: updatedExistList,
      }))
    }
  }

  //Edit popup에서 취소 클릭 시 작성된 text rollback
  const handleCancelUpdateForm = () => {
    if (newList.length !== 0) {
      const updatedNewList = newList.map((item) => {
        if (item.languageCode === langData.languageCode) {
          return {
            ...item,
            text: langData?.text,
          }
        }
        return item
      })
      // 업데이트된 리스트를 atom에 설정
      setList(updatedNewList)
    }
    //기 존재 데이터를 Edit페이지에서 수정할때
    else if (newList.length === 0) {
      const updatedExistList = notiFormAtom.notificationMultiLanguage.map((item) => {
        if (item.languageCode === langData.languageCode) {
          return {
            ...item,
            text: langData?.text,
          }
        }
        return item
      })
      setNotiFormAtom((prev) => ({
        ...prev,
        notificationMultiLanguage: updatedExistList,
      }))
    }
  }

  const transformedArray = languageCode.map((item) => ({ value: item.languageCode, name: item.languageName }))
  //언어코드 api 이름이랑 매핑
  const language = transformedArray.filter((item) => item.value === langData.languageCode)

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
              <th>Language </th>
              <td className="pr_0">
                <SelectMui size="full" options={transformedArray} placeholder={language[0]?.name} disabled />
              </td>
            </tr>

            <tr>
              <th className="va_top">String</th>
              <td className="pr_0">
                <TextArea
                  name="text"
                  placeholder="Please enter the string in the language of your choice."
                  value={newLang}
                  onChange={(event) => {
                    setNewLang(event.target.value)
                    handleUpdateForm(event)
                  }}
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
export default EditMessageEtc
