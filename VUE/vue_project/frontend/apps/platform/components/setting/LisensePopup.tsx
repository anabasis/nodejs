'use client'

import { useLicenseData, useLicenseListData } from '@store/server/useSettingQuery'
import { changeTimeLocal, createMarkup } from 'library/util'
import { mapKeys } from 'lodash-es'
import { useCallback, useEffect, useState } from 'react'
import { BaseInput, InputGroup, InputLabel, PreTypo, SelectChangeEventType, SelectMui } from 'ui'

const convertOptionKey = (obj: object) => mapKeys(obj, (val, key) => (key === 'licenseNumber' ? 'value' : key === 'title' ? 'name' : key))

export default function LisensePopup({ licenseNumber }: { licenseNumber: number }) {
  const [systemCategoryList, setSystemCategoryList] = useState<{ value: string; name: string }[]>([])
  const [licenseCode, setLisenseCode] = useState(`${licenseNumber}`)

  const { data: licenseInfo } = useLicenseData(licenseCode)
  const { data: licenseList } = useLicenseListData()

  useEffect(() => {
    !!licenseList &&
      setSystemCategoryList(
        licenseList.map(
          (item) => mapKeys(item, (val, key) => (key === 'licenseNumber' ? 'value' : key === 'systemName' ? 'name' : key)) as { value: string; name: string }
        )
      )
  }, [licenseList])

  const handleCategoryChange = useCallback((e: SelectChangeEventType) => {
    setLisenseCode(e.target.value)
  }, [])

  return (
    <>
      <div className="popup_filter_wrap mb_20">
        <div className="align start">
          <InputGroup align="inline">
            <InputLabel labelText="Category" />
            <SelectMui options={systemCategoryList} onChange={handleCategoryChange} value={licenseCode} size="medium" />
          </InputGroup>
          <InputGroup align="inline">
            <InputLabel labelText="Date" />
            <BaseInput disabled value={changeTimeLocal({ time: licenseInfo?.createDate, type: 'yyyy-MM-dd' })} />
          </InputGroup>
        </div>
      </div>
      <div className="terms_cont mt_30">
        <PreTypo>
          <div dangerouslySetInnerHTML={createMarkup(licenseInfo?.content)} />
        </PreTypo>
      </div>
    </>
  )
}
