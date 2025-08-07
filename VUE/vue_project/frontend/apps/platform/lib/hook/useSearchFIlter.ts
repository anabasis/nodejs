import { searchParamsAtom, currentPageAtom, setSearchParamsAtom } from 'library/store/client/serachFilterState'
import { SelectChangeEventType } from 'ui/mui/Select'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { ChangeEvent, useEffect, useMemo, useState, useTransition } from 'react'
import { isEmpty, has } from 'lodash-es'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { initDataWithRes } from 'library'

export const useSearchFilter = <T>(initData?: T) => {
  const [_, startTransition] = useTransition()
  const searchParams = useSearchParams()
  const queryString = searchParams.toString()
  const keyword = searchParams.get('keyword') || searchParams.get('name')
  const pathname = usePathname()
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom)
  const searchFilterParams: T = useAtomValue(searchParamsAtom) as T
  const updateSearchFilterParams = useSetAtom(searchParamsAtom)
  const setParams = useSetAtom(setSearchParamsAtom)
  const [valueParam, setValueParam] = useState(keyword || '')
  const [selectTab, setSelectTab] = useState<{ [key in string]: string }>()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const isEnterKeyPressed = (data: React.KeyboardEvent<HTMLInputElement> | string) => {
    return typeof data === 'object' && 'key' in data && data.key === 'Enter'
  }

  const onSelectTab = (event: SelectChangeEventType, key: string) => {
    setSelectTab({ [key]: event.target.value })
  }

  const isParamsLoading = useMemo(() => {
    /* params loading 
       - init update loading
    */
    if (!loading) return true

    return loading && isEmpty(searchFilterParams)
  }, [initData, loading])

  const queryParams = (query, init?: string) => {
    const param = init
      ? query
      : {
          ...searchFilterParams,
          ...query,
        }

    return Object.entries(param)
      .filter(([_, value]) => !isEmpty(value))
      .map(([key, value]) => `&${key}=${value}`)
      .join('')
  }

  const setChangeSearchParams = (data: ChangeEvent<HTMLInputElement> | unknown, key?: string) => {
    /* 
      set params data
      selected or date picker
      event => currentPage 0 or router path move
    */
    setParams({ data, key })
    setCurrentPage(0)
    if (key && typeof data === 'object' && 'target' in data) {
      const targetValue = (data as ChangeEvent<HTMLInputElement>).target?.value
      router.push(`${pathname}?page=0${queryParams({ [key]: targetValue })}`)
    } else {
      router.push(`${pathname}?page=0${queryParams(key ? { [key]: data } : data)}`)
    }
  }
  const onPageChange = (page: number) => {
    startTransition(() => {
      setCurrentPage(page)
    })
    router.push(`${pathname}?page=${page}${queryParams(searchFilterParams)}`)
  }

  const onSearch = (data: React.KeyboardEvent<HTMLInputElement> | string, key?: string) => {
    /* 
      Enter or Click Search => Event Fn      
    */

    if (isEmpty(selectTab) && isEmpty(valueParam)) return
    if (!isEnterKeyPressed(data) && typeof data !== 'string') return
    const param = {}
    /* Entert Event Fn */
    if (isEnterKeyPressed(data)) {
      Object.assign(param, {
        [key]: valueParam,
        ...selectTab,
      })
    } else if (typeof data === 'string') {
      /* Click Event Fn */
      Object.assign(param, {
        [data as string]: valueParam,
        ...selectTab,
      })
    }
    setCurrentPage(0)
    setChangeSearchParams({ ...param })
  }

  const onValueParamChange = (event: React.ChangeEvent<HTMLInputElement> | string, key?: string) => {
    if (typeof event === 'object' && 'target' in event) {
      setValueParam(event.target.value)
    } else if (typeof event === 'string') {
      /* X icon Click Event  */
      setValueParam('')
      setChangeSearchParams({
        [key]: '',
      })
    }
  }

  const hasKeys = (obj: T, keys: string[]) => {
    return keys.some((key) => has(obj, key))
  }

  const tabInit = () => {
    /* 
      Fourth.
      - initData에 tab의 key이 없으면 해당함수는 실행하지않음 (tab이 없는 페이지임)
      - query에 tabinitData에 key값이 있다면 query 사용 / 없으면 기존 initData사용    
    */
    const tabInitData = ['keywordName', 'type', 'keywordTab']

    if (!hasKeys(initData, tabInitData)) return

    const tabObj = tabInitData.reduce((acc, key) => {
      const isQueryStringIncluded = queryString.toString().includes(key)
      if (initData[key]) {
        acc[key] = isQueryStringIncluded ? searchParams.get(key) : initData[key]
      }

      return acc
    }, {})

    setSelectTab(tabObj)
  }

  const initQueryParams = () => {
    /* 
        Thrid. 
        - query에 있는 key, value를 객체화 하여 params에 초기 업데이트
        - query가 있으면 query기반으로 초기세팅해주고, 없으면 initData를 초기세팅함
        - keyword도 있으면 세팅        
    */
    const page = +searchParams.get('page') || 0
    const result = queryString.split('&').reduce((acc, pair) => {
      const [key, value] = pair.split('=')
      if (key === 'page') return acc
      if (!key || !value) return acc

      acc[key] = decodeURIComponent(value.replace(/\+/g, ' '))

      return acc
    }, {})

    const param = {
      ...initData,
      ...result,
    }
    setCurrentPage(page)
    setValueParam(keyword || '')
    updateSearchFilterParams(param)
  }

  const init = () => {
    /* second
       - params loading start
       - tab이 있으면 tab setting
       - url query기반으로 params setting
    */
    setLoading(true)
    initQueryParams()
    tabInit()
  }

  const onResetFilter = (initData: T) => {
    setValueParam('')

    router.push(`${pathname}?page=0${queryParams(initData, 'init')}`)
  }

  const resetSearcFilterParams = () => {
    /* Reset Params */
    updateSearchFilterParams({})
  }

  useEffect(() => {
    /* first. initData or queryString changed => init setting   */
    if (initData) {
      init()
    }
  }, [queryString])

  return {
    searchFilterParams,
    currentPage,
    valueParam,
    selectTab,
    isParamsLoading,
    setChangeSearchParams,
    onResetFilter,
    onSelectTab,
    onSearch,
    onPageChange,
    onValueParamChange,
    resetSearcFilterParams,
    updateSearchFilterParams,
  }
}
