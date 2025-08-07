import { apiAdmin as api, apiAdmin } from 'library/util'

const baseUrl = '/common'

/* ------------GET Method--------------- */

/*  공통 API(약관 국가그룹 조회) */
export const getCommonCountryGruop = async () => {
  const countryGroupCategoryCode = 'CTM'
  const { data } = await api.get(`${baseUrl}/terms/country-group-list?countryGroupCategoryCode=${countryGroupCategoryCode}`)

  return data
}

/* 공통 API(언어 코드)  */
export const getCommonLanguageList = async () => {
  const { data } = await api.get(`${baseUrl}/language-code-list`)

  return data
}

/* 공통 기업리스트(언어 코드)  */
export const getCommonCorporateList = async ({ keyWord = '' }) => {
  const { data } = await api.get(`${baseUrl}/corporate/list?keyWord=${keyWord}`)

  return data
}

/* 공통 사용자 역할 리스트 조회 */
export const getUserRoleList = async () => {
  const { data } = await api.get(`${baseUrl}/usr-role/list`)
  return data
}

/* 공통 어드민 역할 리스트 조회 */
export const getAdminRoleList = async () => {
  const { data } = await apiAdmin.get(`${baseUrl}/adm-role/list`)
  return data
}

/* 공통 국가 코드 리스트 조회 */
export const getCountryCodeList = async () => {
  const { data } = await apiAdmin.get(`${baseUrl}/country-list`)
  return data
}

// 로그인 이력 조회
export const getLoginHistoryList = async (uid: string) => {
  let param = {
    userUid: uid,
  }

  const { data } = await apiAdmin.get(`${baseUrl}/user/loginHistory-list`, {
    params: param,
  })

  return data
}
