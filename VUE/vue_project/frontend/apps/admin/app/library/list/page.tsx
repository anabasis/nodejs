'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Breadcrumb, ButtonMui, ContentBox, SearchIcoInput, SelectMui } from 'ui'
import FilterItem from 'ui/molecules/FilterItem'
import DateRangePicker from 'ui/datepicker/DateRangePicker'
import { LibraryManualType } from '@type/library'
import LibraryListTable from '@components/library/list/LibraryListTable'
import { useEffect } from 'react'
import { useMenu } from 'library'
import { useSearchFilter } from '@hook/useSearchFIlter'
const pageTitleList = ['Library', 'Manual List']

const optionList = [
  {
    name: 'Name',
    value: 'title',
  },
  {
    name: 'Description',
    value: 'cont',
  },
]

function LibraryListPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [manualsId, title] = [searchParams.get('manualsId'), searchParams.get('title')]

  const initData = {
    size: 20,
    type: 'title',
    title,
    manualsId,
  }

  const { getPathInfo } = useMenu()

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
  } = useSearchFilter<LibraryManualType>(initData)
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
            <h1 className="headline1">{title}</h1>
            {/* <Dl listData={descListData} /> */}
          </div>

          <div className="rgt">
            <ButtonMui
              color="primary"
              disabled={getPathInfo(pathname).crtYn !== 'Y'}
              icon="PlusIcon"
              onClick={() => router.push(`/library/list/add?manualsId=${manualsId}&title=${title}`)}
              size="large"
              type="contained"
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
                  setChangeSearchParams({ startDate, endDate, displayStartDate, displayEndDate })
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
                    value={selectTab?.type || ''}
                    placeholder="Select"
                    size="full"
                    onChange={(event) => onSelectTab(event, 'type')}
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

        {!isParamsLoading && <LibraryListTable />}
      </ContentBox>
    </>
  )
}

export default LibraryListPage
