import { apiAdmin as api } from 'library/util'

const baseUrl = '/databoxmanagement'

const manualUrl = `${baseUrl}/manuals`

const manualListUrl = `${baseUrl}/manuals-list`

/* ------------GET Method--------------- */

/*  자료실 관리 목록 조회 */

export const getLibraryManuals = async ({ currentPage }) => {
  const { data } = await api.get(`${manualUrl}?page=${currentPage}&size=300&sort=sortNum`)
  return data
}

/* 자료실관리 리스트 전체 목록 조회 */
export const getLibraryManualsList = async ({ searchFilterParams, currentPage }) => {
  const param = {
    ...searchFilterParams,
    page: currentPage,
    sort: 'mdfDt,desc|crtDt,desc|librNum,desc',
  }
  const { data } = await api.get(`${manualListUrl}`, {
    params: param,
  })
  return data
}

/*  자료실관리 리스트 상세내용 조회*/
export const getLibraryManualsListDetail = async ({ id }) => {
  const { data } = await api.get(`${manualListUrl}/detail?id=${id}`)
  return data
}

/* ------------POST Method--------------- */

/* 자료실관리 메뉴얼 등록 */
export const addLibraryManuals = async ({ params }) => {
  const { data } = await api.post(`${manualUrl}/add`, params)
  return data
}

/*  자료실관리 메뉴얼 정렬 수정*/
export const editLibraryManualsList = async ({ params }) => {
  const { data } = await api.post(`${baseUrl}/manuals-sort`, params)
  return data
}
/*  자료실관리 리스트 자료 등록 */
export const addLibraryManualsList = async ({ params }) => {
  const { data } = await api.post(`${manualListUrl}/add`, params)
  return data
}

/*   자료실관리 메뉴얼 수정,  */
export const modifyLibraryManuals = async ({ params }) => {
  const { data } = await api.post(`${manualUrl}/modify`, params)
  return data
}
/*  자료실관리 리스트 상세내용 수정 */
export const modifyLibraryManualsList = async ({ params }) => {
  const { data } = await api.post(`${manualListUrl}/modify`, params)
  return data
}

/* 자료실관리 메뉴얼 삭제  */
export const deleteLibraryManuals = async ({ manualsId }) => {
  const { data } = await api.post(`${manualUrl}/delete/${manualsId}`)
  return data
}
/*  자료실관리 리스트 상세내용 삭제*/
export const deleteLibraryManualsList = async ({ id }) => {
  const { data } = await api.post(`${manualListUrl}/${id}/delete`)
  return data
}
/*  자료실관리 아이콘 수정 */
export const modifyLibraryManualsIcon = async ({ params }) => {
  const { data } = await api.post(`${baseUrl}/manuals-icon`, params)
  return data
}
