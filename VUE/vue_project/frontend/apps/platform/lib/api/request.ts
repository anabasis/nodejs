import { apiIsc } from 'library/util'
import { PagiabledList, RequestType } from '@type/request/requestType'

export const getRequestList = async (filterInfo, currentPage) => {
  const filter = Object.keys(filterInfo)
    .filter((key) => filterInfo[key] !== '' && filterInfo[key] !== 'all' && !['displayStartDate', 'displayEndDate'].includes(key))
    .map((key) => `${key}=${filterInfo[key]}`)
    .join('&')

  return await apiIsc.get<PagiabledList<RequestType>>(`/request-info/list?${filter === '' ? '' : `${filter}&`}page=${currentPage}`)
}
