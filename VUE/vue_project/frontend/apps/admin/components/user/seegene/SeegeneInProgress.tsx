'use client'

/**
 * 화면: Seegene 회원 관리 In Progress 탭
 */

import { SearchIcoInput, FilterItem, ButtonMui, SelectMui, DateRangePicker } from 'ui'
import { ChangeEvent } from 'react'
import { SeegeneProgressSearch } from '@type/user/user'
import SeegeneInProgressTable from './table/SeegeneInProgressTable'
import { useSearchFilter } from '@hook/useSearchFIlter'
import { useTranslation } from 'library/i18n/client'

const initData = {
  searchType: 'NAME',
  size: 20,
}

const SeegeneInProgress = () => {
  const { t } = useTranslation('platform')
  const { searchFilterParams, selectTab, onResetFilter, setChangeSearchParams, valueParam, onValueParamChange, isParamsLoading, onSelectTab, onSearch } =
    useSearchFilter<SeegeneProgressSearch>(initData)

  return (
    <>
      <div className="align">
        <div className="lft gap_10">
          <FilterItem label={t('Nxox')}>
            <DateRangePicker
              defaultDate={{ startDate: searchFilterParams?.displayStartDate, endDate: searchFilterParams?.displayEndDate }}
              onChangePickerDate={({ displayEndDate, displayStartDate, startDate, endDate }) =>
                setChangeSearchParams({ startDate, endDate, displayEndDate, displayStartDate })
              }
            />
          </FilterItem>
          <FilterItem label={t('QSRZ')}>
            <SearchIcoInput
              uiType="addSelect"
              clearValue={() => onValueParamChange('', 'keyword')}
              placeholder={t('Sxzt')}
              value={valueParam || ''}
              onChangeSearch={(event: ChangeEvent<HTMLInputElement>) => onValueParamChange(event)}
              onSearchClick={() => onSearch('keyword')}
              onSearch={(event) => onSearch(event, 'keyword')}
              width={400}
            >
              <SelectMui
                size="full"
                uiType="multi"
                options={[{ name: t('CwmC'), value: 'NAME' }]}
                value={selectTab?.keywordName || 'NAME'}
                onChange={(event) => onSelectTab(event, 'searchType')}
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
            onClick={() => onResetFilter(initData)}
          />
        </div>
      </div>
      {!isParamsLoading && <SeegeneInProgressTable />}
    </>
  )
}

export default SeegeneInProgress
