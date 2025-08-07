// 작업자 : 김수연

import { ChangeEvent, KeyboardEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { Badge, ButtonMui, NoData } from '@ui/index'
import styles from '@ui/styles/common/_header.module.scss'
import { Icons } from '@ui/components/Icons'
import { ISearchPopover } from 'library/type/search'
import { useProjectSearchResult, useRequestSearchResult } from 'library/store/server/useSearchQuery'
import { getRootUrl, isDev } from 'library'

const initialSearchPopoverProps: ISearchPopover = {
  searchKeyword: '',
  pageNumber: 0,
  pageSize: 10,
}

export const SearchPop = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false)
  const [searchResultCount, setSearchResultCount] = useState<string>('')
  const [searchKeywordInput, setSearchKeywordInput] = useState<string>('')

  const [searchPopoverProps, setSearchPopoverProps] = useState<ISearchPopover>(initialSearchPopoverProps)
  const { data: projectSearchResult, isLoading: isProjectLoading } = useProjectSearchResult(searchPopoverProps)
  const { data: requestSearchResult, isLoading: isRequestLoading } = useRequestSearchResult(searchPopoverProps)

  const handleTextInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchKeywordInput(event.target.value)
    },
    [searchKeywordInput]
  )

  const isResultLoading = () => isProjectLoading || isRequestLoading

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        if (searchKeywordInput.length != 0 && searchKeywordInput !== searchPopoverProps.searchKeyword) {
          setSearchPopoverProps((prev) => ({ ...prev, searchKeyword: searchKeywordInput }))
          setSearchResultCount('0')
        }
        // open popover
        setIsPopoverOpen(true)
      }
    },
    [searchKeywordInput, searchPopoverProps.searchKeyword]
  )

  const onClearButtonClick = () => {
    setSearchKeywordInput('')
  }

  const onShowAllButtonClick = () => {
    // route to 검색결과 전체보기 페이지
    window.location.href = `/search/?searchKeyword=${searchPopoverProps.searchKeyword}`
  }

  const countSearchResult = useCallback(() => {
    let resultCount: number = projectSearchResult?.totalElements + requestSearchResult?.totalElements
    setSearchResultCount(resultCount.toString())
  }, [projectSearchResult?.totalElements, requestSearchResult?.totalElements])

  const highlightKeywordMatch = useCallback(
    (title: string): string => {
      const regex = new RegExp(searchPopoverProps.searchKeyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')

      const highlightKeyword = (substring: string) => `<span class=${styles.highlight}>${substring}</span>`

      const splitedTitleByRegex = title.split(regex)

      if (splitedTitleByRegex?.length == 1) return title

      let hightlightedString = ``
      let matches
      let splitedIndex = 0

      while ((matches = regex.exec(title))) {
        if (splitedTitleByRegex[splitedIndex]?.length == 0) hightlightedString = hightlightedString + highlightKeyword(matches[0])
        else {
          hightlightedString = hightlightedString + splitedTitleByRegex[splitedIndex] + highlightKeyword(matches[0])
        }
        splitedIndex++
        if (splitedIndex === splitedTitleByRegex.length - 1) break
      }

      return hightlightedString + splitedTitleByRegex[splitedIndex]
    },
    [searchPopoverProps.searchKeyword]
  )

  const handleItemClick = (key: string, id: string) => {
    const redirectLink =
      key === 'project'
        ? `/project/detail/?id=${id}`
        : isDev
        ? `${process.env['NEXT_PUBLIC_URL_LOCAL_INSILICO']}/request/?reqId=${id}` ?? ''
        : `${getRootUrl()}/isc/request/?reqId=${id}`

    window.location.href = redirectLink
  }

  const generateSearchResultItemJSX = useMemo(
    () => (key: string, index: number, resultItem: any) => {
      const id = key === 'project' ? resultItem?.id : resultItem?.reqId
      const name = key === 'project' ? resultItem?.prjNm : resultItem?.reqNm
      return (
        <p
          className={styles.item}
          key={`${key}_${index}`}
          onClick={() => {
            handleItemClick(key, id)
          }}
          dangerouslySetInnerHTML={{ __html: highlightKeywordMatch(name) }}
        ></p>
      )
    },
    [projectSearchResult?.resultList, requestSearchResult?.resultList, searchPopoverProps.searchKeyword]
  )

  useEffect(() => {
    if (projectSearchResult && requestSearchResult) {
      countSearchResult()
    }
  }, [projectSearchResult, requestSearchResult])

  return (
    <div className={styles.wrapper}>
      <div className={styles.search_ipt}>
        <Icons.SearchIcon width={20} height={20} fill={searchKeywordInput ? '#354165' : '#A2ADC1'} />
        <input type="text" value={searchKeywordInput} onChange={handleTextInput} onKeyDown={handleKeyDown} placeholder={'Search'} />
        {searchKeywordInput.length > 0 && (
          <button className="clear_btn" onClick={onClearButtonClick}>
            <Icons.XIcon width={20} height={20} fill={'#354165'} />
          </button>
        )}
      </div>

      {isPopoverOpen && (
        <div className={styles.result_wrap}>
          <div className={`align ${styles.wrap_header}`}>
            <div className="lft">
              <p className="title2 mr_10">Search result</p>
              <Badge uiType="solid" color="blue" style="count">
                {searchResultCount}
              </Badge>
            </div>
          </div>
          {isResultLoading() ? (
            ''
          ) : projectSearchResult?.empty && requestSearchResult?.empty ? (
            <NoData text="No results." className={styles.nodata} size="sm" />
          ) : (
            <>
              {projectSearchResult && !projectSearchResult?.empty && (
                <div className={styles.contents} key={'project'}>
                  <p className="body3 blue300">Project</p>
                  <div className="mt_10">
                    {projectSearchResult?.resultList?.map((project: any, index: number) => generateSearchResultItemJSX('project', index, project))}
                  </div>
                </div>
              )}

              {requestSearchResult && !requestSearchResult.empty && (
                <div className={styles.contents} key={'request'}>
                  <p className="body3 blue300">Request</p>
                  <div className="mt_10">
                    {requestSearchResult?.resultList?.map((request: any, index: number) => generateSearchResultItemJSX('request', index, request))}
                  </div>
                </div>
              )}

              <div className="mt_20">
                <ButtonMui color="secondary" size="full" onClick={onShowAllButtonClick}>
                  <span className="body1 blue400">View All</span>
                </ButtonMui>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchPop
