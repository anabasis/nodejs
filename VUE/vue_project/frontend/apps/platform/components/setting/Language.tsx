'use client'

import { useLanguageData, useLanguageListData, useModifyLanguageMutation } from '@store/server/useSettingQuery'
import { useToastPopup } from 'library/hook/useToastPopup'
import { useCallback, useEffect, useState } from 'react'
import { ButtonMui, ContentBox, DetailTable, SelectChangeEventType, SelectMui } from 'ui'

export default function Language() {
  const { toastOpen } = useToastPopup()
  const [saveDisabled, setSaveDisabled] = useState(true)
  const [languageInfo, setLanguageInfo] = useState('')

  const { data: language } = useLanguageData()
  const { data: languageList } = useLanguageListData()

  const modifyLanguage = useModifyLanguageMutation()

  useEffect(() => {
    !!language && setLanguageInfo(language)
  }, [language])

  const handleLanguageChange = useCallback((e: SelectChangeEventType) => {
    setSaveDisabled(false)
    setLanguageInfo(e.target.value)
  }, [])

  const handleSave = useCallback(() => {
    modifyLanguage.mutate(languageInfo, {
      onSuccess: () => {
        setSaveDisabled(true)
        toastOpen({ icon: 'success', content: 'Successfully saved.' })
        window.authKc.updateToken()
      },
      onError: () => {
        toastOpen({ icon: 'warning', content: 'Save failed.' })
      },
    })
  }, [languageInfo, modifyLanguage, toastOpen])

  return (
    <>
      <ContentBox>
        <div className="cont_title_box">
          <p className="title1">Language Setting</p>
          <p className="body2">Please set the system language.</p>
        </div>
        <div className="cont_box">
          <DetailTable
            colgroup={
              <colgroup>
                <col width="210px" />
                <col width="auto" />
              </colgroup>
            }
          >
            <tr>
              <th>Language select</th>
              <td>
                <SelectMui options={languageList} size="large" onChange={handleLanguageChange} value={languageInfo} />
              </td>
            </tr>
          </DetailTable>
        </div>

        <div className="cont_bottom_box">
          <div className="align end">
            <ButtonMui type="outlined" size="xlarge">
              Cancel
            </ButtonMui>
            <ButtonMui type="contained" size="xlarge" isLoading={modifyLanguage.isLoading} onClick={handleSave} iconStyle={{ fill: '#fff' }}>
              Save
            </ButtonMui>
          </div>
        </div>
      </ContentBox>
    </>
  )
}
