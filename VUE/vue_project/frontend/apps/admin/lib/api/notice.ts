import { apiAdmin as api } from 'library/util'

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

/* ------------Post Method--------------- */

/* 공지사항 등록 */
export const addNotice = async ({ params }) => {
  const { data } = await api.post(`${baseUrl}/add`, params)
  return data
}

/* 공지사항 등록 */
export const modifyNotice = async ({ noticeId, params }) => {
  const { data } = await api.post(`${baseUrl}/${noticeId}/modify`, params)
  return data
}

/* 공지사항 삭제 */
export const deleteNotice = async ({ noticeId }) => {
  const { data } = await api.post(`${baseUrl}/${noticeId}/delete`)
  return data
}
