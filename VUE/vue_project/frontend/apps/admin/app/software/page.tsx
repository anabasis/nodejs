/**
 * 작성자 : 양수연
 * 화면 : AW1 소프트웨어
 * path : /software
 * contents :
 */
'use client'
import Board from '@components/software/Board'
import { keywordSelect } from '@constant/softwareOption'
import { useSearchFilter } from '@hook/useSearchFIlter'
import { SoftwareCommonCodes, SoftwareParamsType } from '@type/software/softwareType'
import { selectInitValue, useCode, useMenu } from 'library'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useMemo } from 'react'
import { Breadcrumb, ButtonMui, ContentBox, DateRangePicker, FilterItem, InputGroup, SearchIcoInput, SelectMui } from 'ui'

//header
const pageTitleList = [`Apps Manage`]
const commonCodes = { type: 'PFM028' }

const initData = {
  size: 20,
  keywordName: 'AppName',
}

const Software = () => {
  const router = useRouter()

  const pathname = usePathname()
  const { getPathInfo } = useMenu()

  const {
    searchFilterParams,
    valueParam,
    selectTab,
    isParamsLoading,
    setChangeSearchParams,
    resetSearcFilterParams,
    onValueParamChange,
    onSelectTab,
    onResetFilter,
    onSearch,
  } = useSearchFilter<SoftwareParamsType>(initData)
  const { cCode } = useCode(commonCodes) as { cCode: SoftwareCommonCodes }

  const selectData = useMemo(() => {
    return selectInitValue(cCode)
  }, [cCode]) as SoftwareCommonCodes

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
            <h1 className="headline1">Apps Manage</h1>
          </div>
          <div className="rgt">
            <ButtonMui size="large" icon="PlusIcon" onClick={() => router.push('/software/new')} disabled={getPathInfo(pathname).crtYn !== 'Y'}>
              <span>Add</span>
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
            <FilterItem label="Type">
              <SelectMui
                size="small"
                value={searchFilterParams.ivdRuoCode || ''}
                onChange={(event) => setChangeSearchParams(event, 'ivdRuoCode')}
                options={selectData.type}
              />
            </FilterItem>
            <FilterItem label="Keyword">
              <InputGroup>
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
                    placeholder="Select"
                    size="full"
                    onChange={(event) => onSelectTab(event, 'keywordName')}
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
export default Software
