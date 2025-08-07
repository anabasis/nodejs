'use client'
import React, { useState, useEffect, useCallback, KeyboardEvent, ChangeEvent, useMemo } from 'react'
import { Breadcrumb, ContentBox, ContentBoxWrap, BaseTab, BoardTable, SearchIcoInput, StatusLabel, Pagenation, NoData } from 'ui'

import { useSearchParams, useRouter } from 'next/navigation'
import { useProjectSearchResult, useRequestSearchResult } from '@store/server/useSearchQuery'
import { ISearchPage } from '@type/search/searchType'
import { TableHeaders, TabData, PageTitleList } from '@constant/search'

/**
 * 화면: CR.2 통합검색 전체 결과
 * 경로: /search
 * 기능:
 * 1. 해당 페이지에서 다른 키워드 검색이 가능하다.
 * 2. 검색 결과중 하나를 선택하면 해당 결과의 상세 페이지로 리다이렉트 된다.
 */

/* Tabindex가 0 일때는 project 탭이 active 상태
   Tabindex가 1 일때는 request 탭이 active 상태
*/

const TableStyleByTab = {
  project: [
    <>
      <col width="8%" />
      <col width="10%" />
      <col width="15%" />
      <col width="15%" />
      <col width="auto" />
      <col width="10%" />
      <col width="10%" />
      <col width="10%" />
    </>,
  ],
  request: [
    <>
      <col width="10%" />,
      <col width="10%" />,
      <col width="auto" />,
      <col width="10%" />,
      <col width="10%" />,
      <col width="20%" />,
    </>,
  ],
}

// build 오류 방지를 위해 임시 any 타입 지정
export default function SearchPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const initialSearchKeyword = searchParams.get('searchKeyword')
  const initSearchPageProps: ISearchPage = {
    searchKeyword: decodeURIComponent(initialSearchKeyword),
    activeTabIndex: 0,
    pageNumber: 0,
    pageSize: 20,
  }

  const [searchKeywordInput, setSearchKeywordInput] = useState<string>(initSearchPageProps.searchKeyword)
  const [searchPageProps, setSearchPageProps] = useState<ISearchPage>(initSearchPageProps)
  const { data: projectSearchResult, refetch: refetchProject } = useProjectSearchResult(searchPageProps)
  const { data: requestSearchResult, refetch: refetchRequest } = useRequestSearchResult(searchPageProps)

  const handleTextInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value ? event.currentTarget.value : ''
    setSearchKeywordInput(newValue)
  }, [])

  const handleKeyUp = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        if (searchKeywordInput.length != 0) {
          setSearchPageProps((prev) => ({ ...prev, searchKeyword: searchKeywordInput }))
          router.push(`/search?searchKeyword=${searchKeywordInput}`)
        }
      }
    },
    [searchPageProps.searchKeyword, searchKeywordInput]
  )

  const handleTabChange = useCallback(
    ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
      setSearchPageProps((prev) => ({ ...prev, activeTabIndex: newIndex, pageNumber: 0 }))
      searchPageProps.activeTabIndex == 0 ? refetchProject() : refetchRequest()
    },
    [searchPageProps.activeTabIndex, searchPageProps.searchKeyword]
  )

  const getTextColor = (process: string) => {
    switch (process) {
      case 'Planning':
        return 'planning'
      case 'Oligo Design':
        return 'ordering'
      case 'Feasibility':
        return 'prototype'
      case 'Prototype':
        return 'prototype'
      case 'Ordering':
        return 'ordering'
      case 'Verification':
        return 'validation'
      case 'Validation':
        return 'validation'
      case 'Follow up':
        return 'followup'
    }
  }

  const handleRowClick = useCallback(
    (id: string) => {
      router.push(searchPageProps.activeTabIndex == 0 ? `/project/detail/?id=${id}` : `http://localhost:3030/request/`)
    },
    [router, searchPageProps]
  )

  const handleSearchClick = useCallback(() => {
    if (searchKeywordInput.length != 0) {
      setSearchPageProps((prev) => ({ ...prev, searchKeyword: searchKeywordInput }))
      router.push(`/search?searchKeyword=${searchKeywordInput}`)
    }
  }, [router, searchKeywordInput])

  const handlePageChange = useCallback(
    (newPageNum: number) => {
      setSearchPageProps((prev) => ({ ...prev, pageNumber: newPageNum }))
      searchPageProps.activeTabIndex == 0 ? refetchProject() : refetchRequest()
    },
    [searchPageProps]
  )

  const generateTableContentJSX = useMemo(() => {
    const headerKeyList = searchPageProps.activeTabIndex == 0 ? TableHeaders.project : TableHeaders.request
    const searchResult = searchPageProps.activeTabIndex == 0 ? projectSearchResult : requestSearchResult

    if (searchResult?.empty)
      return (
        <tr className="nodata">
          <td colSpan={searchPageProps.activeTabIndex == 0 ? 8 : 6}>
            <NoData text="No result." />
          </td>
        </tr>
      )

    return searchResult?.resultList?.map((rowData, index) => {
      return (
        <tr key={`row_${index}`} onClick={() => handleRowClick(rowData.id)}>
          {Object.keys(headerKeyList).map((key) => {
            return (
              <td key={`${key}_${index}_${rowData[key]}`}>
                {key === 'reqStsCdNm' ? (
                  <StatusLabel status={rowData[key].toLowerCase()}>{rowData[key]}</StatusLabel>
                ) : key === 'process' ? (
                  <span className={`${getTextColor(rowData[key])}`}>{rowData[key]}</span>
                ) : key === 'dueDate' ? (
                  rowData[key].split(' ')[0]
                ) : key === 'startDt' ? (
                  rowData[key].split('T')[0]
                ) : (
                  rowData[key]
                )}
              </td>
            )
          })}
        </tr>
      )
    })
  }, [searchPageProps.activeTabIndex, projectSearchResult, requestSearchResult])

  const generateTableHeaderJSX = useMemo(() => {
    const iterableList = searchPageProps.activeTabIndex == 0 ? TableHeaders.project : TableHeaders.request

    return Object.values(iterableList).map((value, index) => {
      return <th key={`${index}_${value}`}>{value}</th>
    })
  }, [searchPageProps.activeTabIndex])

  const changeColWidth = useMemo(() => {
    return searchPageProps.activeTabIndex ? TableStyleByTab.request : TableStyleByTab.project
  }, [searchPageProps.activeTabIndex])

  useEffect(() => {
    setSearchPageProps((prev) => ({ ...prev, activeTabIndex: 0, pageNumber: 0 }))
  }, [searchPageProps.searchKeyword])

  useEffect(() => {
    initialSearchKeyword.length == 0 && router.push('/error/404')
  }, [])

  return (
    <>
      <div className="sticky_wrap">
        <ContentBox type="auto">
          <Breadcrumb pageTitleList={PageTitleList} />
          <div className="mt_10 w100">
            <SearchIcoInput
              placeholder="Search"
              value={searchKeywordInput}
              onChangeSearch={handleTextInput}
              onSearch={handleKeyUp}
              onSearchClick={handleSearchClick}
            />
          </div>
        </ContentBox>
        <BaseTab className="mt_20" tabData={TabData} value={searchPageProps.activeTabIndex} onChange={handleTabChange} />
      </div>
      <ContentBox>
        <BoardTable>
          <colgroup>{changeColWidth}</colgroup>
          <thead>
            <tr>{generateTableHeaderJSX}</tr>
          </thead>
          <tbody>{generateTableContentJSX}</tbody>
        </BoardTable>
        {searchPageProps.activeTabIndex == 0
          ? !projectSearchResult?.empty && (
              <Pagenation
                currentPage={searchPageProps.pageNumber}
                totalCount={projectSearchResult?.totalElements}
                pageSize={searchPageProps.pageSize}
                onPageChange={handlePageChange}
              />
            )
          : !requestSearchResult?.empty && (
              <Pagenation
                currentPage={searchPageProps.pageNumber}
                totalCount={requestSearchResult?.totalElements}
                pageSize={searchPageProps.pageSize}
                onPageChange={handlePageChange}
              />
            )}
      </ContentBox>
    </>
  )
}
