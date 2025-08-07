'use client'
import { getCommonLanguageList } from '@api/common'
import { newListAtom, notificationBasicAtom } from '@store/client/notification'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useModal } from 'library/hook/useModal'
import { useEffect, useState } from 'react'
import { ButtonMui, DetailTable, SelectMui, TextArea } from 'ui'

//알림관리(Notification)언어 등록(detail, update의 Add[btn])
const AddMessage = ({ isEnglish }) => {
  const { modalClose } = useModal()
  const [languageCode, setLanguageCode] = useState([])

  const [notiFormAtom, setNotiFormAtom] = useAtom(notificationBasicAtom)

  const [notiForm, setNotiForm] = useState({
    languageCode: '',
    text: '',
  })
  const setList = useSetAtom(newListAtom)
  const newList = useAtomValue(newListAtom)

  useEffect(() => {
    getCommonLanguageList().then((response) => {
      setLanguageCode(response)
    })
  }, [])

  //언어코드 value, name으로 가공
  const transformedArray = languageCode.map((item) => ({ value: item.languageCode, name: item.languageName }))

  //TODO:정리 필요
  const languageOption = () => {
    if (languageCode.length - 1 === newList.length) return []
    else if (isEnglish) {
      const filterArray = transformedArray
        .filter((item) => {
          const joinedCodes = notiFormAtom.notificationMultiLanguage.map((data) => data.languageCode).join(', ')
          return !joinedCodes.includes(item.value)
        })
        .filter((item) => {
          const joinedCodes = newList.map((code) => code.languageCode).join(', ')
          return !joinedCodes.includes(item.value)
        })
      return filterArray
    }
  }

  const handleUpdateForm = (event) => {
    const { name, value } = event.target
    setNotiForm((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  const getEditorForm = () => {
    const newArr = Array.from({ length: 1 }, (_, index) => {
      return {
        languageCode: notiForm.languageCode,
        text: notiForm.text,
      }
    })
    setList((prev) => {
      return [...prev, ...newArr]
    })
  }

  const isValid = () => {
    return notiForm.languageCode.length === 0 || notiForm.text.length === 0
  }

  return (
    <>
      <form>
        <DetailTable
          colgroup={
            <colgroup>
              <col width="23%" />
              <col width="auto" />
            </colgroup>
          }
        >
          <tr>
            <th>Language</th>
            <td className="pr_0">
              <SelectMui
                disabled={languageOption().length === 0} //추가할 수 있는 언어가 없을 경우
                size="full"
                name="languageCode"
                onChange={(event) => handleUpdateForm(event)}
                placeholder={languageOption().length === 0 ? 'There are no languages ​​available to add.' : 'Please select the language want to add.'}
                options={languageOption()}
              />
            </td>
          </tr>

          <tr>
            <th className="va_top">String</th>
            <td className="pr_0">
              <TextArea
                name="text"
                onChange={(event) => handleUpdateForm(event)}
                placeholder="Please enter the string in the language of your choice."
                maxLength={500}
              />
            </td>
          </tr>
        </DetailTable>
      </form>
      <div className="align center mt_30">
        <ButtonMui type="outlined" size="xlarge" onClick={() => modalClose()}>
          Cancel
        </ButtonMui>
        <ButtonMui
          disabled={isValid()}
          size="xlarge"
          onClick={() => {
            getEditorForm()

            modalClose()
          }}
        >
          Add
        </ButtonMui>
      </div>
    </>
  )
}
export default AddMessage
