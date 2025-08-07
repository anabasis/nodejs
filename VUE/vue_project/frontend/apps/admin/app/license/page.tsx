'use client'

import { BoardTable, Breadcrumb, Icons, NoData } from 'ui/components'
import { ContentBox } from 'ui/layouts'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { ButtonMui, SelectChangeEvent, SelectMui } from 'ui/mui'
import DateRangePicker from 'ui/datepicker/DateRangePicker'
import FilterItem from 'ui/molecules/FilterItem'
import { useLicenseListData } from '@store/server/useLicenseQuery'
import { getCode, changeTimeLocal } from 'library/util'
import { useQueries } from '@tanstack/react-query'
import { usePathname, useRouter } from 'next/navigation'
import Pagenation from 'ui/components/common/Pagenation'
import { useSearchFilter } from '@hook/useSearchFIlter'
import { LicenseFilterType } from '@type/license/licenseType'
import { useMenu } from 'library'

export default function EditPage() {
  const router = useRouter()
  const pathname = usePathname()
  const { getPathInfo } = useMenu()
  const commonCodes = { systemType: 'PFM031' }
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
  } = useSearchFilter<LicenseFilterType>(initData)

  const { data: licenseListData } = useLicenseListData(searchFilterParams, currentPage)

  const handleLicenseRowClick = useCallback(
    (rowData, rowIndex, colIndex) => {
      router.push(`/license/detail?id=${rowData.licenceNumber}`)
    },
    [router]
  )
  const handleSystemTypeChange = useCallback((event: SelectChangeEvent) => setChangeSearchParams(event, 'systemType'), [setChangeSearchParams])
  const handlePeriodChange = useCallback(
    ({ startDate, endDate, displayStartDate, displayEndDate }: { startDate: string; endDate: string; displayStartDate: string; displayEndDate: string }) =>
      setChangeSearchParams({ startDate, endDate, displayEndDate, displayStartDate }),
    [setChangeSearchParams]
  )
  const handleAddLicense = useCallback(() => router.push('/license/add'), [router])
  const handleReset = useCallback(() => onResetFilter(initData), [onResetFilter, initData])

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
            <Breadcrumb pageTitleList={['License']} />
            <h1 className="headline1">License</h1>
          </div>
          <div className="rgt">
            <ButtonMui color="primary" icon="PlusIcon" size="large" type="contained" onClick={handleAddLicense} disabled={getPathInfo(pathname).crtYn !== 'Y'}>
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
                onChangePickerDate={handlePeriodChange}
              />
            </FilterItem>
            <FilterItem label="System Type">
              <SelectMui size="medium" onChange={handleSystemTypeChange} options={cCode['systemType']} value={searchFilterParams?.systemType || 'all'} />
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
            <col style={{ width: '13%' }} />
            <col style={{ width: 'auto' }} />
            <col style={{ width: '13%' }} />
          </colgroup>
          <thead>
            <tr>
              <th>No.</th>
              <th>System Type</th>
              <th>Update Date</th>
            </tr>
          </thead>
          <tbody>
            {licenseListData?.content.map((row, index) => (
              <tr key={`${row.licenceNumber}`}>
                <td
                  onClick={() => {
                    handleLicenseRowClick(row, index, 0)
                  }}
                >
                  {row.licenceNumber}
                </td>
                <td
                  onClick={() => {
                    handleLicenseRowClick(row, index, 1)
                  }}
                >
                  {row.systemName}
                </td>
                <td
                  onClick={() => {
                    handleLicenseRowClick(row, index, 2)
                  }}
                >
                  {changeTimeLocal({ time: row.modifyDate, type: 'yyyy-MM-dd' })}
                </td>
              </tr>
            ))}
            {licenseListData?.content.length === 0 && (
              <tr className="nodata">
                <td colSpan={3}>
                  <NoData text="There are no registered licenses." className="full" />
                </td>
              </tr>
            )}
          </tbody>
        </BoardTable>
        {licenseListData?.content.length > 0 && (
          <Pagenation
            currentPage={currentPage}
            onPageChange={onPageChange}
            pageSize={searchFilterParams.size}
            totalCount={licenseListData?.totalElements}
            totalPage={licenseListData?.totalPages}
          />
        )}
      </ContentBox>
    </>
  )
}
