import { apiAdmin } from 'library/util'

/* ------------GET Method--------------- */

/*   국가 목록 조회  */
export const getCountryList = async () => {
  const response = await apiAdmin.get(`/common/country-list`)
  return response.data
}

/*   회원 목록 조회  */
export const getUserList = async () => {
  const response = await apiAdmin.get(`/common/user/user-list`)
  return response.data
}

/*   기업 목록 조회  */
export const getCorporateBoard = async ({ searchFilterParams, currentPage }) => {
  const param = {
    ...searchFilterParams,
    page: currentPage,
  }
  const response = await apiAdmin.get('/corporate/list', {
    params: param,
  })
  return response.data
}

/*   기업 상세 조회  */
export const getCorporateDetail = async (corpId: string) => {
  const { data } = await apiAdmin.get(`/corporate/${corpId}/detail`)
  return data
}

/* ------------POST Method--------------- */

/* 기업 수정 */
export const modifyCorporate = async ({ corporateId, modifyData }) => {
  const { data } = await apiAdmin.post(`/corporate/${corporateId}/modify`, modifyData)
  return data
}

/* 기업 삭제 */
export const deleteCorporate = async ({ corporateId }) => {
  const { data } = await apiAdmin.post(`/corporate/${corporateId}/delete`)
  return data
}
