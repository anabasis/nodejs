'use client'

import { BaseInput, InputGroup, InputLabel, PreTypo, SelectChangeEventType, SelectMui } from '@ui/index'
import { changeTimeLocal, createMarkup } from 'library/util'
import { mapKeys } from 'lodash-es'
import { useCallback, useEffect, useState } from 'react'
import { useTermsData, useTermsCountryGroupData, useTermsFilterItemData } from 'library/store/server/useTermsQuery'
import { TermsFilterItemsTyps } from 'library/type/terms'

export default function TermsPopup({ termsCategoryCode }: { termsCategoryCode: string }) {
  const [versionList, setVersionList] = useState<{ name: string; value: string }[]>([])
  const [languageList, setLanguageList] = useState<{ name: string; value: string }[]>([])
  const [termsFilter, setTermsFilter] = useState<{ country: string; version: string; language: string } | undefined>(undefined)

  const { data: termsInfo } = useTermsData(termsCategoryCode, termsFilter)
  const { data: countryGroupList } = useTermsCountryGroupData(termsCategoryCode)
  const { data: termsFilterItems } = useTermsFilterItemData(termsCategoryCode, termsFilter)

  useEffect(() => {
    if (!!termsFilterItems) {
      setVersionList(
        termsFilterItems?.map((item: TermsFilterItemsTyps) => {
          return { name: item.version, value: item.version }
        })
      )
    }
  }, [termsFilterItems])

  useEffect(() => {
    if (!!termsFilterItems && termsFilter) {
      const res = termsFilterItems
        ?.find((item: TermsFilterItemsTyps) => item.version === termsFilter?.version)
        ?.languageCode.map(
          (item) => mapKeys(item, (val, key) => (key === 'languageCode' ? 'value' : key === 'nativeName' ? 'name' : key)) as { value: string; name: string }
        )
      setLanguageList(res || [])
    }
  }, [termsFilterItems, termsFilter])

  useEffect(() => {
    !!termsInfo &&
      setTermsFilter({ country: termsInfo?.countryGroupCd, version: termsInfo?.termsVer.version, language: termsInfo?.termsVer.termsCondit.languageCode })
  }, [termsInfo])

  const handleCountryChange = useCallback((e: SelectChangeEventType) => {
    setTermsFilter({ country: e.target.value, version: '', language: '' })
  }, [])

  const handleLanguageChange = useCallback((e: SelectChangeEventType) => {
    setTermsFilter((prev) => {
      return !!prev ? { ...prev, language: e.target.value } : { country: '', version: '', language: e.target.value }
    })
  }, [])

  const handleVersionChange = useCallback((e: SelectChangeEventType) => {
    setTermsFilter((prev) => {
      return !!prev ? { ...prev, version: e.target.value, language: '' } : { country: '', language: '', version: e.target.value }
    })
  }, [])

  return (
    <>
      {/* 
        최유희 MEMO :: 마크업 변경 및 디자인 반영 완료
        약관쪽 내용은 어드민에서 textarea로 받고있어서 디자인 스타일은 적용하지 않았습니다. 
     */}
      <div className="popup_filter_wrap">
        <div className="align start gap_10">
          <InputGroup align="inline">
            <InputLabel labelText="Country Group" />
            <SelectMui options={!!countryGroupList ? countryGroupList : []} onChange={handleCountryChange} value={!!termsFilter ? termsFilter.country : ''} />
          </InputGroup>
          <InputGroup align="inline">
            <InputLabel labelText="Version" />
            <SelectMui options={versionList} onChange={handleVersionChange} value={!!termsFilter ? termsFilter.version : ''} />
          </InputGroup>
          <InputGroup align="inline">
            <InputLabel labelText="Language" />
            <SelectMui options={languageList} onChange={handleLanguageChange} value={!!termsFilter ? termsFilter.language : ''} />
          </InputGroup>
          <InputGroup align="inline">
            <InputLabel labelText="Date" />
            <BaseInput value={!!termsInfo ? changeTimeLocal({ time: termsInfo.termsVer.applyDate, type: 'yyyy-MM-dd' }) : ''} disabled />
          </InputGroup>
        </div>
      </div>
      <div className="terms_cont mt_30">
        <PreTypo>
          <div dangerouslySetInnerHTML={createMarkup(termsInfo?.termsVer.termsCondit.content || '')} />
        </PreTypo>
      </div>
    </>
  )
}
