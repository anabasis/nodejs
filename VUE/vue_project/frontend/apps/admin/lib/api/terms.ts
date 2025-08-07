import { apiAdmin as api } from 'library/util'

const baseUrl = 'termsandconditionsmanagement'

/* ------------GET Method--------------- */

/* 약관 전체 목록 조회 */

export const getTermsList = async ({ searchFilterParams, currentPage }) => {
  const param = {
    ...searchFilterParams,
    page: currentPage,
  }

  const { data } = await api.get(`${baseUrl}/list`, {
    params: param,
  })

  return data
}

/* Terms 상세 [완료] */
export const getTermDetail = async ({ versionNum }) => {
  const { data } = await api.get(`${baseUrl}/detail?versionNum=${versionNum}`)
  return data
}

/* ------------POST Method--------------- */

/* Terms를 등록 [완료] */
export const getTermsAdd = async ({ params }) => {
  const { data } = await api.post(`${baseUrl}/add`, params)
  return data
}

/* Terms 수정 [완료] */

export const editTerms = async ({ params }) => {
  const { data } = await api.post(`${baseUrl}/modify`, params)
  return data
}

/* Terms 삭제 [완료] */
export const deleteTerms = async ({ termsofserviceId }) => {
  const { data } = await api.post(`${baseUrl}/${termsofserviceId}/delete`)
  return data
}
