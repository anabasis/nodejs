import { api } from 'library/util'

const baseUrl = '/databox'

/* ------------GET Method--------------- */

/* 자료실 매뉴얼 리스트를 조회 */
export const getLibraryManual = async ({ currentPage }) => {
  const { data } = await api.get(`${baseUrl}/manuals?page=${currentPage}&size=300&sort=sortNum`)
  return data
}

/* 자료실  리스트를 조회 */

export const getLibrary = async ({ searchFilterParams, currentPage }) => {
  const param = {
    ...searchFilterParams,
    page: currentPage,
    sort: 'mdfDt,desc|crtDt,desc|librNum,desc',
  }
  const { data } = await api.get(`${baseUrl}/manuals-list?`, {
    params: param,
  })

  return data
}

/* 자료실 리스트 상세 정보 조회 */

export const getLibraryDetail = async ({ manualsDetailId }) => {
  const { data } = await api.get(`${baseUrl}/manuals-list/detail?manualsDetailId=${manualsDetailId}`)
  return data
}
