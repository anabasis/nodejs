'use client'
import { Breadcrumb, ContentBox, SearchIcoInput, InputGroup, ButtonMui, SelectMui } from 'ui'
import FilterItem from 'ui/molecules/FilterItem'
import DateRangePicker from 'ui/datepicker/DateRangePicker'
import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { DetailGuideParamsType } from '@type/detail-guilde'
import DetailGuideTable from '@components/detail-guide/DetailGuideTable'
import { useSearchFilter } from '@hook/useSearchFIlter'
import { useMenu } from 'library'

const selectOption = [
  {
    value: 'title',
    name: 'title',
  },
]

const initData = {
  size: 20,
  keywordName: 'title',
}

const pageTitleList = ['Detail Guide']

const DetailGuidePage = () => {
  const {
    searchFilterParams,
    valueParam,
    selectTab,
    resetSearcFilterParams,
    setChangeSearchParams,
    onValueParamChange,
    onSelectTab,
    onResetFilter,
    onSearch,
    isParamsLoading,
  } = useSearchFilter<DetailGuideParamsType>(initData)
  const router = useRouter()
  const pathname = usePathname()
  const { getPathInfo } = useMenu()

  useEffect(() => {
    return () => {
      resetSearcFilterParams()
    }
  }, [])

  return (
    <>
      <div className="sticky_wrap">
        <ContentBox type="top_content">
          <div className="lft">
            <Breadcrumb pageTitleList={pageTitleList} />
            <h1 className="headline1">Detail Guide</h1>
          </div>
          <div className="rgt">
            <ButtonMui
              color="primary"
              icon="PlusIcon"
              onClick={() => router.push('/detail-guide/add')}
              size="large"
              type="contained"
              disabled={getPathInfo(pathname).crtYn !== 'Y'}
            >
              Add
            </ButtonMui>
          </div>
        </ContentBox>
      </div>

      <ContentBox>
        <div className="align">
          <div className="lft gap_10">
            <FilterItem label="Period">
              <DateRangePicker
                defaultDate={{ startDate: searchFilterParams?.displayStartDate, endDate: searchFilterParams?.displayEndDate }}
                onChangePickerDate={({ startDate, endDate, displayStartDate, displayEndDate }) =>
                  setChangeSearchParams({ periodFromDate: startDate, periodToDate: endDate, displayStartDate, displayEndDate })
                }
              />
            </FilterItem>
            <FilterItem label="Keyword">
              <InputGroup>
                <SearchIcoInput
                  uiType="addSelect"
                  clearValue={() => onValueParamChange('', 'keyword')}
                  onSearchClick={() => setChangeSearchParams(valueParam, 'keyword')}
                  onSearch={(event) => onSearch(event, 'keyword')}
                  value={valueParam || ''}
                  onChangeSearch={onValueParamChange}
                  placeholder="Enter keyword"
                >
                  <SelectMui
                    value={selectTab?.keywordName || ''}
                    placeholder="Select"
                    size="full"
                    onChange={(event) => onSelectTab(event, 'keywordName')}
                    options={selectOption}
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

        {!isParamsLoading && <DetailGuideTable />}
      </ContentBox>
    </>
  )
}

export default DetailGuidePage
