'use client'

import { BoardTable, Breadcrumb, Icons, NoData, SearchIcoInput, StatusLabel } from 'ui/components'
import Pagenation from 'ui/components/common/Pagenation'
import DateRangePicker from 'ui/datepicker/DateRangePicker'
import { ContentBox } from 'ui/layouts'
import FilterItem from 'ui/molecules/FilterItem'
import { SelectMui, ButtonMui, SelectChangeEvent } from 'ui/mui'
import { useRouter } from 'next/navigation'
import { ChangeEvent, KeyboardEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { changeTimeLocal, getCode } from 'library/util'
import { useQueries } from '@tanstack/react-query'
import { useProcessListData, useProjectListData } from '@store/server/useProjectQuery'
import { ProjectFilterType, ProjectListType } from '@type/project/projectType'
import { useSearchFilter } from '@hook/useSearchFIlter'

export default function Page() {
  const pageTitleList = ['Project']
  const router = useRouter()
  const commonCodes = { diseaseCategory: 'PFM020', purpose: 'PFM015' }
  const codes = useQueries({
    queries: Object.values(commonCodes).map((v) => {
      return { queryKey: ['code', v], queryFn: () => getCode(v), staleTime: Infinity }
    }),
  })
  let cCode = {}
  Object.keys(commonCodes).forEach((v, i) => {
    if (typeof codes[i].data === 'object') {
      cCode[v] = [{ name: 'All', value: 'all' }].concat(codes[i].data)
    }
  })

  const initData = useMemo(
    () => ({
      size: 20,
    }),
    []
  )

  const {
    valueParam,
    isParamsLoading,
    resetSearcFilterParams,
    onValueParamChange,
    onResetFilter,
    onSearch,
    onPageChange,
    setChangeSearchParams,
    currentPage,
    searchFilterParams,
  } = useSearchFilter<ProjectFilterType>(initData)

  const { data: processListData } = useProcessListData(false)
  const { data: projectListData } = useProjectListData(searchFilterParams, currentPage)

  const handleDiseaseCategoryChange = useCallback((event: SelectChangeEvent) => setChangeSearchParams(event, 'diseaseCategoryCode'), [setChangeSearchParams])
  const handlePurposeChange = useCallback((event: SelectChangeEvent) => setChangeSearchParams(event, 'purposeCode'), [setChangeSearchParams])
  const handleProcessChange = useCallback((event: SelectChangeEvent) => setChangeSearchParams(event, 'processCode'), [setChangeSearchParams])
  const handleProjectClick = useCallback(
    (data: ProjectListType, rowIndex: number, colIndex: number) => {
      router.push(`/project/detail?id=${data.id}`)
    },
    [router]
  )

  const displayProcess = useCallback((item: ProjectListType) => {
    const processedValue = item.process ? item.process.toLocaleLowerCase().split(' ').join('') : null
    return processedValue ? <p className={`${processedValue} ${item.prjStsCd === 'ONG' ? '' : 'disabledProcess'}`}>{item.process}</p> : null
  }, [])

  const handlePeriodChange = useCallback(
    ({ startDate, endDate, displayStartDate, displayEndDate }: { startDate: string; endDate: string; displayStartDate: string; displayEndDate: string }) =>
      setChangeSearchParams({ startDate, endDate, displayEndDate, displayStartDate }),
    [setChangeSearchParams]
  )

  const handleReset = useCallback(() => onResetFilter(initData), [onResetFilter, initData])
  const handleSearch = useCallback(() => onSearch('keyword'), [onSearch])
  const handleSearchKeyEvent = useCallback((event: KeyboardEvent<HTMLInputElement>) => onSearch(event, 'keyword'), [onSearch])

  useEffect(() => {
    return () => {
      resetSearcFilterParams()
    }
  }, [])

  return (
    <>
      <div className="sticky_wrap">
        <ContentBox type="top_content">
          {/* lft/rgt 가 좌우로 정렬됩니다.  */}
          <div className="lft">
            <Breadcrumb pageTitleList={pageTitleList} />
            <h1 className="headline1">Project</h1>
          </div>
        </ContentBox>
      </div>
      <ContentBox>
        <div className="align">
          <div className="lft gap_10">
            <FilterItem label="Period">
              <DateRangePicker
                defaultDate={{ startDate: searchFilterParams?.displayStartDate, endDate: searchFilterParams?.displayEndDate }}
                onChangePickerDate={handlePeriodChange}
              />
            </FilterItem>
            <FilterItem label="Product Category">
              <SelectMui
                size="small"
                onChange={handleDiseaseCategoryChange}
                options={cCode['diseaseCategory']}
                value={searchFilterParams?.diseaseCategoryCode || 'all'}
              />
            </FilterItem>
            <FilterItem label="Purpose">
              <SelectMui size="small" onChange={handlePurposeChange} options={cCode['purpose']} value={searchFilterParams?.purposeCode || 'all'} />
            </FilterItem>
            {/* <FilterItem label="Process">
              <SelectMui
                size="small"
                onChange={handleProcessChange}
                options={!!processListData ? [{ name: 'All', value: 'all' }].concat(processListData as { name: string; value: string }[]) : []}
                value={searchFilterParams?.processCode || 'all'}
              />
            </FilterItem> */}
            <FilterItem label="Keyword">
              <SearchIcoInput
                clearValue={() => onValueParamChange('', 'keyword')}
                placeholder="Enter keyword"
                value={valueParam || ''}
                onChangeSearch={onValueParamChange}
                onSearch={handleSearchKeyEvent}
                onSearchClick={handleSearch}
              />
            </FilterItem>
            <ButtonMui
              size="xsmall"
              type="outlined"
              color="gray"
              uiType="reset_btn"
              icon="ResetIcon"
              iconStyle={{ width: 20, height: 20, fill: '#354165' }}
              onClick={handleReset}
            />
          </div>
        </div>
        <BoardTable>
          <colgroup>
            <col style={{ width: '8%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '15%' }} />
            <col style={{ width: 'auto' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '110px' }} />
          </colgroup>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Category</th>
              <th>Target Market</th>
              <th>Purpose</th>
              <th>Project Name</th>
              <th>Status</th>
              <th>Process</th>
              <th>Corporate</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {projectListData?.content.map((row, index) => {
              return (
                <tr key={`projectlist-${index}`}>
                  <td
                    onClick={() => {
                      handleProjectClick(row, index, 0)
                    }}
                  >
                    {row.id}
                  </td>
                  <td
                    onClick={() => {
                      handleProjectClick(row, index, 1)
                    }}
                  >
                    {row.dissCatCd}
                  </td>
                  <td
                    onClick={() => {
                      handleProjectClick(row, index, 6)
                    }}
                  >
                    {row.targetMarket || '-'}
                  </td>
                  <td
                    onClick={() => {
                      handleProjectClick(row, index, 2)
                    }}
                  >
                    {row.purpose}
                  </td>
                  <td
                    onClick={() => {
                      handleProjectClick(row, index, 3)
                    }}
                  >
                    {row.prjNm}
                  </td>
                  <td>
                    <StatusLabel status={row.prjStsNm} type="circle">
                      {row.prjStsNm}
                    </StatusLabel>
                  </td>
                  <td
                    onClick={() => {
                      handleProjectClick(row, index, 4)
                    }}
                  >
                    {displayProcess(row)}
                  </td>
                  <td
                    onClick={() => {
                      handleProjectClick(row, index, 5)
                    }}
                  >
                    {row.corporate}
                  </td>
                  <td
                    onClick={() => {
                      handleProjectClick(row, index, 7)
                    }}
                  >
                    {changeTimeLocal({ time: row.dueDate, type: 'yyyy-MM-dd' })}
                  </td>
                </tr>
              )
            })}
            {projectListData?.content.length === 0 && (
              <tr className="nodata">
                <td colSpan={9}>
                  <NoData text="There are no registred projects." />
                </td>
              </tr>
            )}
          </tbody>
        </BoardTable>
        {projectListData?.content.length > 0 && (
          <Pagenation
            currentPage={currentPage}
            pageSize={searchFilterParams.size}
            totalCount={projectListData?.totalElements | 0}
            onPageChange={onPageChange}
            totalPage={projectListData?.totalPages}
          />
        )}
      </ContentBox>
    </>
  )
}
