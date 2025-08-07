'use client'

/**
 * 화면: Seegene 회원 관리 In Invitation 탭
 */

import { ButtonMui, SelectMui, SearchIcoInput, FilterItem, DateRangePicker } from 'ui'
import { ChangeEvent } from 'react'
import { SeegeneInvitaionSearch } from '@type/user/user'
import SeegeneInInvitationTable from './table/SeegeneInInvitationTable'
import { useSearchFilter } from '@hook/useSearchFIlter'
import { useTranslation } from 'library/i18n/client'

const initData = {
  searchType: 'EMAIL',
  size: 20,
}

const SeegeneInInvitation = () => {
  const { t } = useTranslation('platform')
  const { searchFilterParams, selectTab, onResetFilter, setChangeSearchParams, valueParam, onValueParamChange, isParamsLoading, onSelectTab, onSearch } =
    useSearchFilter<SeegeneInvitaionSearch>(initData)

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
              placeholder={t('Sxzt')}
              clearValue={() => onValueParamChange('', 'keyword')}
              value={valueParam || ''}
              onChangeSearch={(event: ChangeEvent<HTMLInputElement>) => onValueParamChange(event)}
              onSearchClick={() => onSearch('keyword')}
              onSearch={(event) => onSearch(event, 'keyword')}
              width={400}
            >
              <SelectMui
                uiType="multi"
                size="full"
                options={[{ name: t('yMUt'), value: 'EMAIL' }]}
                value={selectTab?.searchType || 'EMAIL'}
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
      {!isParamsLoading && <SeegeneInInvitationTable />}
    </>
  )
}

export default SeegeneInInvitation
