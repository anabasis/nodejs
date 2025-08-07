import { ISearchPopover } from '../type/search'
import { api, apiIsc } from '../util'

export const getProjectSearchResult = async ({ searchKeyword, pageNumber, pageSize }: ISearchPopover) => {
  return await api.get(`/project/list?projectTab=PROJECT&keyword=${encodeURIComponent(searchKeyword)}&page=${pageNumber}&size=${pageSize}`)
}

export const getRequestSearchResult = async ({ searchKeyword, pageNumber, pageSize }: ISearchPopover) => {
  return await apiIsc.get(`/request-info/list?keyword=${encodeURIComponent(searchKeyword)}&page=${pageNumber}&size=${pageSize}`)
}
