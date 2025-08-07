import { getProjectSearchResult, getRequestSearchResult } from '../../api/search'
import { ISearchPopover } from '../../type/search'
import { useQuery } from '@tanstack/react-query'

const emtpyResponse = { resultList: [], totalElements: 0, empty: true }

export const useProjectSearchResult = (searchPopoverProps: ISearchPopover) => {
  const { searchKeyword } = searchPopoverProps
  return useQuery({
    queryKey: ['projectSearchResultPopover', searchKeyword],
    queryFn: () => getProjectSearchResult(searchPopoverProps),
    select: (result) => {
      return searchKeyword.length != 0 ? { resultList: result.data.content, totalElements: result.data.totalElements, empty: result.data.empty } : emtpyResponse
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
  })
}

export const useRequestSearchResult = (searchPopoverProps: ISearchPopover) => {
  const { searchKeyword } = searchPopoverProps
  return useQuery({
    queryKey: ['requestSearchResultPopover', searchKeyword],
    queryFn: () => getRequestSearchResult(searchPopoverProps),
    select: (result) => {
      return searchKeyword.length != 0 ? { resultList: result.data.content, totalElements: result.data.totalElements, empty: result.data.empty } : emtpyResponse
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
  })
}
