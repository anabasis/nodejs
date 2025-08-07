import { getProjectSearchResult, getRequestSearchResult } from '@api/search'
import { useQuery } from '@tanstack/react-query'
import { ISearchPage } from '@type/search/searchType'

export const useProjectSearchResult = (searchPageProps: ISearchPage) => {
  const { searchKeyword, pageNumber } = searchPageProps
  return useQuery({
    queryKey: ['projectSearchResult', searchKeyword, pageNumber],
    queryFn: () => getProjectSearchResult(searchPageProps),
    select: (result) => {
      return { resultList: result.data.content, totalElements: result.data.totalElements, empty: result.data.empty }
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
  })
}

export const useRequestSearchResult = (searchPageProps: ISearchPage) => {
  const { searchKeyword, pageNumber } = searchPageProps
  return useQuery({
    queryKey: ['requestSearchResult', searchKeyword, pageNumber],
    queryFn: () => getRequestSearchResult(searchPageProps),
    select: (result) => {
      return { resultList: result.data.content, totalElements: result.data.totalElements, empty: result.data.empty }
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
  })
}
