/**
 * 작성자 : 양수연
 * 화면 : AO.1 Corporate
 * path : /corporate
 */
'use client'
import Board from '@components/corporate/Board'
import { corporateLevelCode, keywordSelect } from '@constant/corporateOption'
import { useSearchFilter } from '@hook/useSearchFIlter'
import { useCorporateCommon } from '@store/server/useCorporateQuery'
import { CorporateCommonCodes, CorporateParamsType } from '@type/corporate/corporateType'
import { useCode, useMenu } from 'library'
import { selectInitValue } from 'library/util'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useMemo } from 'react'
import { Breadcrumb, ButtonMui, ContentBox, DateRangePicker, FilterItem, InputGroup, SearchIcoInput, SelectMui } from 'ui'

const pageTitleList = [`Corporate`]
const commonCodes = { corporateLevel: 'PFM045', status: 'PFM048' }

const initData = {
  size: 20,
  keywordTab: 'corpNm',
}

const Corporate = () => {
  const router = useRouter()
  const { countryList } = useCorporateCommon()
  const pathname = usePathname()
  const { getPathInfo } = useMenu()

  const {
    searchFilterParams,
    valueParam,
    selectTab,
    isParamsLoading,
    resetSearcFilterParams,
    setChangeSearchParams,
    onValueParamChange,
    onSelectTab,
    onResetFilter,
    onSearch,
  } = useSearchFilter<CorporateParamsType>(initData)
  const { cCode } = useCode(commonCodes) as { cCode: CorporateCommonCodes }

  const selectData = useMemo(() => {
    return selectInitValue(cCode)
  }, [cCode]) as CorporateCommonCodes

  useEffect(() => {
    countryList
    return () => {
      resetSearcFilterParams()
    }
  }, [])
  return (
    <>
      {/* 헤더 */}
      <div className="sticky_wrap">
        <ContentBox type="top_content">
          <div className="lft">
            <Breadcrumb pageTitleList={pageTitleList} />
            <h1 className="headline1">Corporate</h1>
          </div>
          <div className="rgt">
            <ButtonMui
              color="primary"
              icon="PlusIcon"
              onClick={() => router.push(`/corporate/new`)}
              size="large"
              type="contained"
              disabled={getPathInfo(pathname).crtYn !== 'Y'}
            >
              Add
            </ButtonMui>
          </div>
        </ContentBox>
      </div>
      {/* 필터 및 테이블 */}
      <ContentBox>
        <div className="align">
          <div className="lft gap_10">
            <FilterItem label="Period">
              <DateRangePicker
                defaultDate={{ startDate: searchFilterParams?.displayStartDate, endDate: searchFilterParams?.displayEndDate }}
                onChangePickerDate={({ startDate, endDate, displayEndDate, displayStartDate }) =>
                  setChangeSearchParams({ periodToDate: startDate, periodFromDate: endDate, displayEndDate, displayStartDate })
                }
              />
            </FilterItem>

            <FilterItem label="Corporate Level">
              <SelectMui
                size="small"
                placeholder="All"
                value={searchFilterParams.corpLvlCd || ''}
                onChange={(event) => setChangeSearchParams(event, 'corpLvlCd')}
                options={corporateLevelCode}
              />
            </FilterItem>
            <FilterItem label="Country">
              <SelectMui
                size="small"
                placeholder="All"
                value={searchFilterParams.cntryCd || ''}
                onChange={(event) => setChangeSearchParams(event, 'cntryCd')}
                options={countryList}
              />
            </FilterItem>
            <FilterItem label="Status">
              <SelectMui
                size="small"
                placeholder="All"
                value={searchFilterParams.corpStsCd || ''}
                onChange={(event) => setChangeSearchParams(event, 'corpStsCd')}
                options={selectData.status}
              />
            </FilterItem>

            <FilterItem label="Keyword">
              <InputGroup>
                <SearchIcoInput
                  uiType="addSelect"
                  clearValue={() => onValueParamChange('', 'corpNm')}
                  onSearchClick={() => onSearch('corpNm')}
                  onSearch={(event) => onSearch(event, 'corpNm')}
                  value={valueParam || ''}
                  onChangeSearch={onValueParamChange}
                  placeholder="Enter keyword"
                >
                  <SelectMui
                    value={selectTab?.keywordTab || ''}
                    placeholder="Select"
                    size="full"
                    onChange={(event) => onSelectTab(event, 'keywordTab')}
                    options={keywordSelect}
                    uiType="multi"
                  />
                </SearchIcoInput>
              </InputGroup>
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
        {!isParamsLoading && <Board />}
      </ContentBox>
    </>
  )
}
export default Corporate
