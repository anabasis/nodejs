'use client'

import { SearchIcoInput, FilterItem, DateRangePicker, ButtonMui, SelectMui } from 'ui'
import { NewCoInvitationSearch } from '@type/user/user'
import NewCoInInvitationTable from './table/NewCoInInvitationTable'
import { useSearchFilter } from '@hook/useSearchFIlter'
import { useTranslation } from 'library/i18n/client'

/**
 * 화면: Newco 회원 관리 In Invitation 탭
 */

const initData = {
  searchType: 'corpNm',
  size: 20,
}

const NewCoInInvitation = () => {
  const { t } = useTranslation('platform')
  const { searchFilterParams, isParamsLoading, selectTab, valueParam, setChangeSearchParams, onSelectTab, onSearch, onResetFilter, onValueParamChange } =
    useSearchFilter<NewCoInvitationSearch>(initData)

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
              onChangeSearch={(event) => onValueParamChange(event)}
              onSearchClick={() => onSearch('keyword')}
              onSearch={(event) => onSearch(event, 'keyword')}
              width={400}
            >
              <SelectMui
                size="full"
                uiType="multi"
                options={[{ name: t('orzY'), value: 'corpNm' }]}
                value={selectTab?.searchType || 'corpNm'}
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
      {!isParamsLoading && <NewCoInInvitationTable />}
    </>
  )
}

export default NewCoInInvitation
