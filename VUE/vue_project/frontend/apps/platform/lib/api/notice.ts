import { api } from 'library/util'

const baseUrl = '/notice'

/* ------------GET Method--------------- */

/*  공지사항 전체 조회 */

export const getNotice = async ({ searchFilterParams, currentPage }) => {
  const param = {
    ...searchFilterParams,
    page: currentPage,
  }
  const { data } = await api.get(`${baseUrl}/list`, {
    params: param,
  })

  return data
}

/* 공지사항 상세 조회 */
export const getNoticeListDetail = async ({ noticeId }) => {
  const { data } = await api.get(`${baseUrl}/${noticeId}/detail`)

  return data
}
