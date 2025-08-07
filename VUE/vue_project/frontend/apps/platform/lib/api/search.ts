import { ISearchPage } from '@type/search/searchType'
import { api, apiIsc } from 'library/util'

// 전체 검색 결과 페이지에 보여지는 검색 결과 리퀘스트
export const getProjectSearchResult = async ({ searchKeyword, pageNumber, activeTabIndex, pageSize }: ISearchPage) => {
  return await api.get(`/project/list?projectTab=PROJECT&keyword=${encodeURIComponent(searchKeyword)}&page=${pageNumber}&size=${pageSize}`)
}

export const getRequestSearchResult = async ({ searchKeyword, pageNumber, activeTabIndex, pageSize }: ISearchPage) => {
  return await apiIsc.get(`/request-info/list?keyword=${encodeURIComponent(searchKeyword)}&page=${pageNumber}&size=${pageSize}`)
}
