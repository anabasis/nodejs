'use client'

import { Breadcrumb, FilterItem, DateRangePicker, ContentBox, SearchIcoInput, SelectMui, ButtonMui } from 'ui'
import { useEffect, useMemo } from 'react'
import { useCode, selectInitValue, useMenu } from 'library'
import { NoticeCommonCodesType, NoticeParamsType } from '@type/notice'
import NoticeTable from '@components/notice/NoticeTable'
import { usePathname, useRouter } from 'next/navigation'
import { useSearchFilter } from '@hook/useSearchFIlter'

/*  Notice -공지사항은 필독이 상단으로 오는 것 없애기로 했습니다  */
const pageTitleList = ['Notice']

const initData = {
  size: 20,
  keywordName: 'title',
}

const optionList = [
  {
    name: 'Title',
    value: 'title',
  },
  {
    name: 'Writer',
    value: 'writer',
  },
]
const commonCodes = { category: 'PFM001' }
function NoticePage() {
  const router = useRouter()
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
  const pathname = usePathname()
  const { getPathInfo } = useMenu()

  const selectData = useMemo(() => {
    return selectInitValue(cCode)
  }, [cCode]) as NoticeCommonCodesType

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
          <div className="rgt">
            <ButtonMui
              color="primary"
              icon="PlusIcon"
              onClick={() => router.push('/notice/add')}
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
                onChangePickerDate={({ displayEndDate, displayStartDate, startDate, endDate }) =>
                  setChangeSearchParams({ startDate, endDate, displayEndDate, displayStartDate })
                }
              />
            </FilterItem>

            <FilterItem label="Category">
              <SelectMui
                size="small"
                value={searchFilterParams.category || ''}
                onChange={(event) => setChangeSearchParams(event, 'category')}
                options={selectData.category}
              />
            </FilterItem>

            {/* MEMO: SearchIcoInput, Select uiType 스타일 프롭스 명칭 변경되었습니다. */}
            <FilterItem label="Keyword">
              <div className="grid6">
                <SearchIcoInput
                  clearValue={() => onValueParamChange('', 'keyword')}
                  uiType="addSelect"
                  onSearchClick={() => onSearch('keyword')}
                  onSearch={(event) => onSearch(event, 'keyword')}
                  value={valueParam || ''}
                  onChangeSearch={onValueParamChange}
                  placeholder="Enter keyword"
                >
                  <SelectMui
                    value={selectTab?.keywordName || 'title'}
                    size="full"
                    onChange={(event) => onSelectTab(event, 'keywordName')}
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
