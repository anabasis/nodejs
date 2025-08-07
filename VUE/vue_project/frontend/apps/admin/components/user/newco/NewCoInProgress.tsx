'use client'

import { ChangeEvent, useState } from 'react'
import { SearchIcoInput, ButtonMui, SelectMui, FilterItem, DateRangePicker } from 'ui'
import { NewCoProgressSearch } from '@type/user/user'
import NewCoInProgressTable from './table/NewCoInProgressTable'
import { isEmpty } from 'lodash-es'
import { useNewCoPrgressData } from '@store/server/useNewCoUserQuery'
import { useTranslation } from 'library/i18n/client'

/**
 * 화면: Newco 회원 관리 In Progress 탭
 */

const initData = {
  searchType: 'userNm',
  keyword: '',
  size: 20,
}

const NewCoInProgress = () => {
  const { t } = useTranslation('platform')
  const [params, setParams] = useState<NewCoProgressSearch>(initData)
  const [currentPage, setCurrentPage] = useState(0)
  const [valueParam, setValueParam] = useState('')
  const [selectTab, setSelectTab] = useState<{ [key in string]: string }>({ searchType: 'userNm' })

  const { progressList, isSuccess } = useNewCoPrgressData({ params, currentPage })

  const newcoSearchType = [
    { name: t('CwmC'), value: 'userNm' },
    { name: t('orzY'), value: 'corpNm' },
  ]

  const isEnterKeyPressed = (data: React.KeyboardEvent<HTMLInputElement> | string) => {
    return typeof data === 'object' && 'key' in data && data.key === 'Enter'
  }

  const onSearch = (data: React.KeyboardEvent<HTMLInputElement> | string, key?: string) => {
    if (isEmpty(selectTab) && isEmpty(valueParam)) return
    if (!isEnterKeyPressed(data) && typeof data !== 'string') return
    const param = {
      searchType: '',
      keyword: '',
    }
    /* Entert Event Fn */
    if (isEnterKeyPressed(data)) {
      Object.assign(param, {
        [key]: valueParam,
        ...selectTab,
      })
    } else if (typeof data === 'string') {
      /* Click Event Fn */
      Object.assign(param, {
        [data as string]: valueParam,
        ...selectTab,
      })
    }
    setCurrentPage(0)
    setParams({ ...params, ...param })
  }

  const resetParam = () => {
    setCurrentPage(0)
    setValueParam('')
    setSelectTab({ searchType: 'userNm' })
    setParams(initData)
  }

  return (
    <>
      <div className="align">
        <div className="lft gap_10">
          <FilterItem label={t('Nxox')}>
            <DateRangePicker
              defaultDate={{ startDate: params?.displayStartDate, endDate: params?.displayEndDate }}
              onChangePickerDate={({ displayEndDate, displayStartDate, startDate, endDate }) => {
                setCurrentPage(0)
                setParams({ ...params, startDate: startDate, endDate: endDate, displayEndDate: displayEndDate, displayStartDate: displayStartDate })
              }}
            />
          </FilterItem>
          <FilterItem label={t('QSRZ')}>
            <SearchIcoInput
              uiType="addSelect"
              placeholder={t('Sxzt')}
              value={valueParam || ''}
              clearValue={() => setValueParam('')}
              onChangeSearch={(event: ChangeEvent<HTMLInputElement>) => setValueParam(event.target.value)}
              onSearchClick={() => onSearch('keyword')}
              onSearch={(event) => onSearch(event, 'keyword')}
              width={400}
            >
              <SelectMui
                size="full"
                uiType="multi"
                options={newcoSearchType}
                value={selectTab?.searchType || 'userNm'}
                onChange={(event) => setSelectTab({ searchType: event.target.value })}
              />
            </SearchIcoInput>
          </FilterItem>
          <ButtonMui
            size="xsmall"
            type="outlined"
            color="gray"
            uiType="reset_btn"
            icon="ResetIcon"
            iconStyle={{ width: 20, height: 20, fill: '#354165' }}
            onClick={() => resetParam()}
          />
        </div>
      </div>
      {isSuccess && <NewCoInProgressTable size={initData.size} currentPage={currentPage} setCurrentPage={setCurrentPage} progressList={progressList} />}
    </>
  )
}

export default NewCoInProgress
