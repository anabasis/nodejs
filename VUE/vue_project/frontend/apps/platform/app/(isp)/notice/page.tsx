'use client'

import { Breadcrumb, FilterItem, DateRangePicker, ContentBox, SearchIcoInput, SelectMui, InputGroup, ButtonMui } from 'ui'
import { useEffect, useMemo } from 'react'
import { useParamsData, useCode, selectInitValue } from 'library'
import { NoticeCommonCodesType, NoticeParamsType } from '@type/notice'
import { CommonSelectCodesType } from 'library/type/common'
import NoticeTable from '@components/notice/NoticeTable'
import { useSearchFilter } from '@hook/useSearchFIlter'

/*  Notice -공지사항은 필독이 상단으로 오는 것 없애기로 했습니다  */
const pageTitleList = ['Notice']

const initData = {
  size: 20,
  keywordTab: 'TITLE',
}

const optionList = [
  {
    name: 'Title',
    value: 'TITLE',
  },
  {
    name: 'Content',
    value: 'CONTENT',
  },
]
const commonCodes = { category: 'PFM001' }
function NoticePage() {
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
  } = useSearchFilter<NoticeParamsType>(initData)
  const { cCode } = useCode(commonCodes) as { cCode: NoticeCommonCodesType }

  const selectData: CommonSelectCodesType = useMemo(() => {
    return selectInitValue(cCode)
  }, [cCode])

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
            <h1 className="headline1">Notice</h1>
          </div>
        </ContentBox>
      </div>

      <ContentBox>
        <div className="align">
          <div className="lft gap_10">
            <FilterItem label="Period">
              <DateRangePicker
                defaultDate={{ startDate: searchFilterParams?.displayStartDate, endDate: searchFilterParams?.displayEndDate }}
                onChangePickerDate={({ displayEndDate, displayStartDate, startDate, endDate }) =>
                  setChangeSearchParams({ startDate, endDate, displayEndDate, displayStartDate })
                }
              />
            </FilterItem>

            <FilterItem label="Category">
              <SelectMui
                size="small"
                value={searchFilterParams.noticeCategoryTab || ''}
                onChange={(event) => setChangeSearchParams(event, 'noticeCategoryTab')}
                options={selectData.category}
              />
            </FilterItem>

            <FilterItem label="Keyword">
              <div className="grid6">
                <SearchIcoInput
                  uiType="addSelect"
                  clearValue={() => onValueParamChange('', 'keyword')}
                  onSearchClick={() => onSearch('keyword')}
                  onSearch={(event) => onSearch(event, 'keyword')}
                  value={valueParam || ''}
                  onChangeSearch={onValueParamChange}
                  placeholder="Enter keyword"
                >
                  <SelectMui
                    value={selectTab?.keywordTab || ''}
                    placeholder="Select"
                    size="full"
                    onChange={(event) => onSelectTab(event, 'keywordTab')}
                    options={optionList}
                    uiType="multi"
                  />
                </SearchIcoInput>
              </div>
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

        {!isParamsLoading && <NoticeTable />}
      </ContentBox>
    </>
  )
}

export default NoticePage
