import { apiAdmin } from 'library/util'

const baseURL = '/data-code-management/code'
/* ------------GET Method--------------- */

/*   공통코드 목록 조회  */
export const getCommonCodeList = async ({ searchFilterParams, currentPage }) => {
  const param = {
    ...searchFilterParams,
    page: currentPage,
  }
  const response = await apiAdmin.get(`${baseURL}/list`, {
    params: param,
  })
  return response.data
}

/*   공통코드 기본정보 상세 조회  */
export const getCommonCodeBasicInfo = async ({ id }) => {
  return apiAdmin.get(`${baseURL}/${id}/detail`)
}

/*   공통코드 아이템코드 상세 조회  */
export const getCommonCodeItemInfo = async ({ id }) => {
  return apiAdmin.get(`${baseURL}/${id}/detail-item`)
}

/* ------------POST Method--------------- */

/*   공통코드 추가  */
export const addCommonCode = async ({ data }) => {
  return apiAdmin.post(`${baseURL}/add`, data)
}

/*   공통코드 수정  */
export const modifyCommonCode = async ({ data }) => {
  return apiAdmin.post(`${baseURL}/modify`, data)
}

/*   공통코드 삭제  */
export const deleteCommonCode = async ({ id }) => {
  return apiAdmin.post(`${baseURL}/${id}/delete`)
}
