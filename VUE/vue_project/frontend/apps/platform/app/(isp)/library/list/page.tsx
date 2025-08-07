'use client'

import { Breadcrumb, FilterItem, DateRangePicker, ContentBox, SearchIcoInput, SelectMui, ButtonMui } from 'ui'
import { useEffect } from 'react'
import { useParamsData } from 'library'
import { LibraryParamsType } from 'library/type/library'
import LibraryTable from '@components/library/list/LibraryTable'
import { useSearchParams } from 'next/navigation'
import { useSearchFilter } from '@hook/useSearchFIlter'

const pageTitleList = ['Library', 'Maunal List']

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
  const [title, manualsDetailId] = [searchParams.get('title'), searchParams.get('manualsDetailId')]
  const initData = {
    size: 20,
    type: 'title',
    title,
    manualsDetailId,
  }

  const {
    searchFilterParams,
    valueParam,
    selectTab,
    isParamsLoading,
    resetSearcFilterParams,
    setChangeSearchParams,
    onSearch,
    onSelectTab,
    onValueParamChange,
    onResetFilter,
  } = useSearchFilter<LibraryParamsType>({ ...initData, manualsId: manualsDetailId, title })

  const onReset = () => {
    onResetFilter(initData)
  }

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
                    placeholder="Select"
                    value={selectTab?.type || ''}
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
              onClick={onReset}
            />
          </div>
        </div>

        {!isParamsLoading && <LibraryTable />}
      </ContentBox>
    </>
  )
}

export default LibraryListPage
