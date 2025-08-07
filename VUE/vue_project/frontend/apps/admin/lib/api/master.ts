import { apiAdmin } from 'library/util'

const baseURL = '/data-code-management/masterdata'

/* ------------GET Method--------------- */

/*   제품 목록 조회  */
export const getProductBoard = async ({ searchFilterParams, currentPage }) => {
  const param = {
    ...searchFilterParams,
    page: currentPage,
  }
  const response = await apiAdmin.get(`${baseURL}/product/list`, {
    params: param,
  })
  return response.data
}

/*   장비 목록 조회  */
export const getInstrumentBoard = async ({ searchFilterParams, currentPage }) => {
  const param = {
    ...searchFilterParams,
    page: currentPage,
  }
  const response = await apiAdmin.get(`${baseURL}/equipment/list`, {
    params: param,
  })
  return response.data
}

/*   장비드라이버 목록 조회  */
export const getInstrumentDriverBoard = async ({ searchFilterParams, currentPage }) => {
  const param = {
    ...searchFilterParams,
    page: currentPage,
  }
  const response = await apiAdmin.get(`${baseURL}/equipment-driver/list`, {
    params: param,
  })
  return response.data
}

/*   캡필름 목록 조회  */
export const getCapFilmBoard = async ({ searchFilterParams, currentPage }) => {
  const param = {
    ...searchFilterParams,
    page: currentPage,
  }
  const response = await apiAdmin.get(`${baseURL}/cap-film/list`, {
    params: param,
  })
  return response.data
}

/*   플레이트 목록 조회  */
export const getPlateBoard = async ({ searchFilterParams, currentPage }) => {
  const param = {
    ...searchFilterParams,
    page: currentPage,
  }
  const response = await apiAdmin.get(`${baseURL}/plate/list`, {
    params: param,
  })
  return response.data
}

/*   마스터 데이터 상세 조회  */
export const getMasterDataDetail = async ({ path, masterId }) => {
  const { data } = await apiAdmin.get(`${baseURL}/${path}/${masterId}/detail`)
  return data
}

/* ------------POST Method--------------- */

/*   마스터 데이터 추가   */
export const addMasterData = async ({ path, data }) => {
  const response = await apiAdmin.post(`${baseURL}/${path}/add`, data)
  return response.data
}

/*   마스터 데이터 수정   */
export const modifyMasterData = async ({ path, masterId, data }) => {
  const response = await apiAdmin.post(`${baseURL}/${path}/${masterId}/modify`, data)
  return response.data
}

/*   마스터 데이터 삭제   */
export const deleteMasterData = async ({ path, masterId }) => {
  const { data } = await apiAdmin.post(`${baseURL}/${path}/${masterId}/delete`)
  return { data }
}
