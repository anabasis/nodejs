import { useQuery } from '@tanstack/react-query'
import { getNotice } from '@api/notice'
import { NoticeListReturnType } from '@type/notice'

export const useNoticeQuery = ({ searchFilterParams, currentPage }) => {
  const { data: noticeList, isSuccess } = useQuery<NoticeListReturnType>(['noticeList', searchFilterParams, currentPage], () =>
    getNotice({ searchFilterParams, currentPage })
  )

  return {
    noticeList,
    isSuccess,
  }
}
