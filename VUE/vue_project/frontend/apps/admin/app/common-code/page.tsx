/**
 * 작성자 : 양수연
 * 화면 : AD.1 공통 코드
 * path : /common-code
 */
'use client'
import Board from '@components/common-code/Board'
import { commonCodeKeyword } from '@constant/commonCodeOption'
import { useSearchFilter } from '@hook/useSearchFIlter'
import { CommonCodeParamsType } from '@type/common-code/commonCodeType'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useMenu } from 'library'
import { Breadcrumb, ButtonMui, ContentBox, DateRangePicker, FilterItem, SearchIcoInput, SelectMui } from 'ui'

const pageTitleList = [`Standard Code`]

const initData = {
  size: 20,
  keywordName: 'CodeGroup',
}
const CommonCode = () => {
  const router = useRouter()

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
  } = useSearchFilter<CommonCodeParamsType>(initData)

  useEffect(() => {
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
            <h1 className="headline1">{pageTitleList}</h1>
          </div>
          <div className="rgt">
            <ButtonMui
              color="primary"
              icon="PlusIcon"
              onClick={() => router.push(`/common-code/add`)}
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
                onChangePickerDate={({ displayEndDate, displayStartDate, startDate, endDate }) =>
                  setChangeSearchParams({ startDate, endDate, displayEndDate, displayStartDate })
                }
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
                    value={selectTab?.keywordName || ''}
                    size="full"
                    onChange={(event) => onSelectTab(event, 'keywordName')}
                    options={commonCodeKeyword}
                    uiType="multi"
                    placeholder="Select"
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

        {!isParamsLoading && <Board />}
      </ContentBox>
    </>
  )
}
export default CommonCode
