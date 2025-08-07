'use client'

import { useQuery } from '@tanstack/react-query'
import { RequestType, RequestFilterType } from '@type/request/requestType'
import { useAlert } from 'library/hook/useAlert'
import { useToastPopup } from 'library/hook/useToastPopup'
import { ChangeEvent, KeyboardEvent, useCallback, useEffect, useMemo, useState } from 'react'
import {
  BaseTab,
  BoardTable,
  Breadcrumb,
  ButtonMui,
  ContentBox,
  ContentBoxWrap,
  ContextButton,
  StatusLabel,
  SearchIcoInput,
  SelectMui,
  Icons,
  NoData,
} from 'ui'
import Pagenation from 'ui/components/common/Pagenation'
import DateRangePicker from 'ui/datepicker/DateRangePicker'
import FilterItem from 'ui/molecules/FilterItem'
import { SelectChangeEventType } from 'ui/mui/Select'
import { changeTimeLocal, getCode, getRootUrl, isDev } from 'library/util'
import { useRequestListData } from '@store/server/useRequestQuery'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCopyRequestMutation, useDeleteRequestMutation } from '@store/server/useProjectQuery'
import { useSearchFilter } from '@hook/useSearchFIlter'

export default function Page() {
  const pageTitleList = ['Oligo Design']

  const { data: requestStatusList } = useQuery({
    queryKey: ['code', 'ODS052'],
    queryFn: () => getCode('ODS052'),
    select: (result) => [{ name: 'All', value: 'all' }].concat(result),
    staleTime: Infinity,
  })

  const { data: appTypeList } = useQuery({
    queryKey: ['code', 'ODS001'],
    queryFn: () => getCode('ODS001'),
    select: (result) => [{ name: 'All', value: 'all' }].concat(result),
    staleTime: Infinity,
  })

  const router = useRouter()
  const searchParams = useSearchParams()
  const [apptype] = useState(searchParams.get('apptype'))
  const [appTpCd] = useState(searchParams.get('appTpCd'))

  const [selectedTab, setSelectedTab] = useState(0)
  const [tabList, setTabList] = useState<{ tabName: string; value: string }[]>([])

  const { alertOpen, alertClose } = useAlert()
  const { toastOpen } = useToastPopup()

  const initData = useMemo(() => ({ size: 20 }), [])

  const {
    onPageChange,
    currentPage,
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
  } = useSearchFilter<RequestFilterType>(initData)

  const { data: requestList, refetch: requestFetch } = useRequestListData(searchFilterParams, currentPage)
  const deleteRequestMutation = useDeleteRequestMutation()
  const copyRequestMutation = useCopyRequestMutation()

  useEffect(() => {
    if (!!appTypeList) {
      setTabList(
        appTypeList.map((item, index) => {
          if (item.value === apptype) {
            setSelectedTab(index)
            if (!!apptype && apptype !== 'all' && apptype !== appTpCd) {
              router.replace(`/request/?apptype=${item.value}&appTpCd=${item.value}`)
            }
          }
          return { tabName: item.name, value: item.value }
        })
      )
    }
  }, [appTypeList])

  useEffect(() => {
    if (!!requestList) {
      if (currentPage !== 0 && requestList.content.length === 0) {
        onPageChange(currentPage - 1)
      }
    }
  }, [requestList])

  useEffect(() => {
    return () => resetSearcFilterParams()
  }, [])

  const handleTabChage = useCallback(
    ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
      setSelectedTab(newIndex)
      newIndex === 0 ? router.push(`/request`) : router.push(`/request/?apptype=${tabList[newIndex].value}&appTpCd=${tabList[newIndex].value}`)
    },
    [router, tabList]
  )
  const handlePeriod = useCallback(
    ({ startDate, endDate, displayStartDate, displayEndDate }: { startDate: string; endDate: string; displayStartDate: string; displayEndDate: string }) =>
      setChangeSearchParams({ startDate, endDate, displayEndDate, displayStartDate }),
    [setChangeSearchParams]
  )
  const handleStatus = useCallback((event: SelectChangeEventType) => setChangeSearchParams(event, 'reqStsCd'), [setChangeSearchParams])
  const handleApptype = useCallback((event: SelectChangeEventType) => setChangeSearchParams(event, 'appTpCd'), [setChangeSearchParams])

  const handleReset = useCallback(
    () => (selectedTab === 0 ? onResetFilter(initData) : router.push(`/request/?apptype=${tabList[selectedTab].value}&appTpCd=${tabList[selectedTab].value}`)),
    [initData, onResetFilter, router, selectedTab, tabList]
  )

  const handleSearch = useCallback(() => onSearch('keyword'), [onSearch])

  const copyRequest = useCallback(
    (item: RequestType) => {
      alertClose()
      copyRequestMutation.mutate(item.reqId, {
        onSuccess(data, variables, context) {
          requestFetch()
          toastOpen({
            icon: 'success',
            content: 'Successfully copied.',
          })
        },
        onError(error, variables, context) {
          toastOpen({
            icon: 'warning',
            content: 'Copy failed.',
          })
        },
      })
    },
    [alertClose, copyRequestMutation, requestFetch, toastOpen]
  )
  const deleteRequest = useCallback(
    (item: RequestType) => {
      alertClose()
      deleteRequestMutation.mutate(item.reqId, {
        onSuccess(data, variables, context) {
          requestFetch()
          toastOpen({
            icon: 'success',
            content: 'Successfully deleted.',
          })
        },
        onError(error, variables, context) {
          toastOpen({
            icon: 'error',
            content: 'Delete failed.',
          })
        },
      })
    },
    [alertClose, deleteRequestMutation, requestFetch, toastOpen]
  )

  const handleRequestCopy = (item: RequestType): void => {
    alertOpen({
      title: 'Copy request',
      content: (
        <div className="align center mt_30">
          {/* 팝업의 버튼은 xlarge 사이즈 입니다.  */}
          <ButtonMui
            type="outlined"
            size="xlarge"
            onClick={() => {
              alertClose()
            }}
          >
            Cancel
          </ButtonMui>
          <ButtonMui
            size="xlarge"
            onClick={() => {
              copyRequest(item)
            }}
          >
            Copy
          </ButtonMui>
        </div>
      ),
      textTitle: `All Analyte and Multiflex information of the request is being copied. The copied request information can be modified.`,
      maxWidth: 'xs',
    })
  }
  const handleRequestDelete = (item: RequestType): void => {
    alertOpen({
      title: 'Are you sure to delete?',
      content: (
        <div className="align center mt_30">
          {/* 팝업의 버튼은 xlarge 사이즈 입니다.  */}
          <ButtonMui
            type="outlined"
            size="xlarge"
            onClick={() => {
              alertClose()
            }}
          >
            Cancel
          </ButtonMui>
          <ButtonMui
            size="xlarge"
            onClick={() => {
              deleteRequest(item)
            }}
          >
            Delete
          </ButtonMui>
        </div>
      ),
      textTitle: `If you click the delete button, it cannot be recovered.`,
      icon: 'info',
      maxWidth: 's',
    })
  }

  const getContextList = (row: RequestType) => {
    //프로젝트/프로세스 관리자 Case 경우 Copy request, Delete request
    //시약개발자 Case 경우 Copy request
    if (row.prjRolCd === 'PJM' || (row.prjRolCd === 'PJB' && row.projectProcRolCode === 'MGMT')) {
      return [
        // {
        //   name: 'Copy request',
        //   onClick: handleRequestCopy,
        // },
        {
          name: 'Delete request',
          onClick: handleRequestDelete,
        },
      ]
    }
    // if (row.prjRolCd === 'PJB' && row.projectProcRolCode === 'EDIT') {
    //   return [
    //     {
    //       name: 'Copy request',
    //       onClick: handleRequestCopy,
    //     },
    //   ]
    // }
    return []
  }

  const handleRequestRowClick = useCallback((rowData: RequestType, rowIndex: number, colIndex: number) => {
    // router.push(`http://localhost:3030/request`)
    // router.push(
    //   isDev ? `${process.env['NEXT_PUBLIC_URL_LOCAL_INSILICO']}/request/?reqId=${rowData.reqId}` ?? '' : `${getRootUrl()}/isc/request/?reqId=${rowData.reqId}`
    // )
    // console.log(
    //   260,
    //   isDev ? `${process.env['NEXT_PUBLIC_URL_LOCAL_INSILICO']}/request/?reqId=${rowData.reqId}` ?? '' : `${getRootUrl()}/isc/request/?reqId=${rowData.reqId}`
    // )
    const { reqId, appTpCd } = rowData
    location.href = isDev
      ? `${process.env['NEXT_PUBLIC_URL_LOCAL_INSILICO']}/request/?reqId=${reqId}` ?? ''
      : `${getRootUrl()}/isc/request/?reqId=${rowData.reqId}&appTp=${appTpCd}`
  }, [])

  const handleSearchKey = useCallback((event: KeyboardEvent<HTMLInputElement>) => onSearch(event, 'keyword'), [onSearch])

  return (
    <>
      <div className="sticky_wrap">
        <ContentBox type="top_content">
          <div className="lft">
            <Breadcrumb pageTitleList={pageTitleList} />
            <h1 className="headline1">Oligo Design Request</h1>
          </div>
        </ContentBox>
        <BaseTab tabData={tabList} onChange={handleTabChage} value={selectedTab} />
      </div>
      <ContentBox>
        <div className="align">
          <div className="lft gap_10">
            <FilterItem label="Period">
              <DateRangePicker
                defaultDate={{ startDate: searchFilterParams?.displayStartDate, endDate: searchFilterParams?.displayEndDate }}
                placeholderText="Select period"
                onChangePickerDate={handlePeriod}
              />
            </FilterItem>
            <FilterItem label="Status">
              <SelectMui options={requestStatusList} onChange={handleStatus} value={searchFilterParams?.reqStsCd || 'all'} />
            </FilterItem>
            {selectedTab === 0 && (
              <FilterItem label="App Type">
                <SelectMui options={appTypeList} onChange={handleApptype} value={searchFilterParams.appTpCd || 'all'} />
              </FilterItem>
            )}
            <FilterItem label="Keyword">
              <SearchIcoInput
                value={valueParam}
                clearValue={() => onValueParamChange('', 'keyword')}
                placeholder="Enter keyword"
                onSearchClick={handleSearch}
                onChangeSearch={onValueParamChange}
                onSearch={handleSearchKey}
              />
            </FilterItem>
            <ButtonMui size="xsmall" type="outlined" color="gray" uiType="reset_btn" icon="ResetIcon" onClick={handleReset} />
          </div>
        </div>
        <BoardTable>
          <colgroup>
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: 'auto' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '25%' }} />
            <col style={{ width: '4%' }} />
          </colgroup>
          <thead>
            <tr>
              <th>Status</th>
              <th>App Type</th>
              <th>Request Name</th>
              <th>ID</th>
              <th>Date</th>
              <th>Project Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {requestList?.content?.map((row, index) => (
              <tr key={`reqeust-${row.reqId}`}>
                <td
                  onClick={() => {
                    handleRequestRowClick(row, index, 0)
                  }}
                >
                  <StatusLabel status={row.reqStsCdNm.toLowerCase()}>{row.reqStsCdNm}</StatusLabel>
                </td>
                <td
                  onClick={() => {
                    handleRequestRowClick(row, index, 1)
                  }}
                >
                  {row.appTpCdNm}
                </td>
                <td
                  onClick={() => {
                    handleRequestRowClick(row, index, 2)
                  }}
                >
                  {row.reqNm}
                </td>
                <td
                  onClick={() => {
                    handleRequestRowClick(row, index, 3)
                  }}
                >
                  {row.reqId}
                </td>
                <td
                  onClick={() => {
                    handleRequestRowClick(row, index, 4)
                  }}
                >
                  {changeTimeLocal({ time: row.startDt, type: 'yyyy-MM-dd' })}
                </td>
                <td
                  onClick={() => {
                    handleRequestRowClick(row, index, 5)
                  }}
                >
                  {row.prjNm}
                </td>
                <td>
                  {getContextList(row).length > 0 && <ContextButton<RequestType> rotate={true} iconsize={20} rowData={row} options={getContextList(row)} />}
                </td>
              </tr>
            ))}
            {requestList?.totalElements === 0 && (
              <tr className="nodata">
                <td colSpan={7}>
                  <NoData text="There are no requests." className="full" />
                </td>
              </tr>
            )}
          </tbody>
        </BoardTable>
        {requestList?.totalElements > 0 && (
          <Pagenation
            currentPage={currentPage}
            totalCount={requestList.totalElements}
            totalPage={requestList.totalPages}
            pageSize={searchFilterParams.size}
            onPageChange={onPageChange}
          />
        )}
      </ContentBox>
    </>
  )
}
