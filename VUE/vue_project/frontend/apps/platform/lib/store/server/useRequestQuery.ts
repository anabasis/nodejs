import { getRequestList } from '@api/request'
import { useQuery } from '@tanstack/react-query'
import { RequestFilterType } from '@type/request/requestType'

export const useRequestListData = (filterInfo: RequestFilterType, currentPage: number) => {
  return useQuery({
    queryKey: [
      'request',
      `fromDt${filterInfo.fromDt}`,
      `toDt${filterInfo.toDt}`,
      `reqStsCd${filterInfo.reqStsCd}`,
      `appTpCd${filterInfo.appTpCd}`,
      `keyworkd${filterInfo.keyword}`,
      `${currentPage}`,
    ],
    queryFn: () => getRequestList(filterInfo, currentPage),
    select: (result) => result.data,
  })
}
