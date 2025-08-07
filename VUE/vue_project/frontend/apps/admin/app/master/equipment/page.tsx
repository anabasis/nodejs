'use client'

import { PageListTab } from '@components/common/PageListTab'
import EquipmentBoard from '@components/master/EquipmentBoard'
import { masterDataTabName, tabData } from '@constant/masterDataOption'
import { useSearchFilter } from '@hook/useSearchFIlter'
import { MasterParamsType } from '@type/mater/masterDataType'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useMenu } from 'library'
import { Breadcrumb, Icons, InputGroup, SearchIcoInput } from 'ui/components'
import { DateRangePicker } from 'ui/datepicker'
import { ContentBox, ContentBoxWrap } from 'ui/layouts'
import { FilterItem } from 'ui/molecules'
import { ButtonMui, ContextButton, SelectMui } from 'ui/mui'

const pageTitleList = [`Master Data`]

const Equipment = () => {
  const router = useRouter()

  const pathname = usePathname()
  const { getPathInfo } = useMenu()
  const onlyR = getPathInfo(pathname).crtYn !== 'Y'

  const initData = {
    size: 20,
    keywordTab: 'Name',
  }

  const optionList = [
    {
      name: 'Name',
      value: 'Name',
    },
  ]

  const {
    searchFilterParams,
    valueParam,
    resetSearcFilterParams,
    isParamsLoading,
    selectTab,
    setChangeSearchParams,
    onValueParamChange,
    onSelectTab,
    onResetFilter,
    onSearch,
  } = useSearchFilter<MasterParamsType>(initData)

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
            <h1 className="headline1">Master Data</h1>
          </div>
          <div className="rgt">
            <ContextButton
              options={tabData.map((data) => {
                return {
                  name: `Add ${data.tabName}`,
                  onClick: () => {
                    router.push(`/master/new?path=${masterDataTabName[data.tabName]}`)
                  },
                }
              })}
              uiType="dropdown"
              disabled={onlyR}
            >
              <div className={`btn primary lg ${onlyR ? 'disabled' : null}`}>
                <Icons.PlusIcon width={16} height={16} fill="#fff" />
                <span className="mr_8 white">Add</span>
                <i className="ico_angle down">
                  <Icons.AngleIcon width={16} height={16} classname="down" fill="#fff" />
                </i>
              </div>
            </ContextButton>
          </div>
        </ContentBox>
        <PageListTab tabData={tabData} activeTab={1} />
      </div>
      <ContentBox>
        <div className="align">
          <div className="lft gap_10">
            <FilterItem label="Period">
              <DateRangePicker onChangePickerDate={({ startDate, endDate }) => setChangeSearchParams({ startDate, endDate })} />
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
                    placeholder="Select"
                    value={selectTab?.keywordTab || ''}
                    size="full"
                    onChange={(event) => onSelectTab(event, 'keywordTab')}
                    options={optionList}
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

        {!isParamsLoading && <EquipmentBoard />}
      </ContentBox>
    </>
  )
}
export default Equipment
