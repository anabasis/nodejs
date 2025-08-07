import { apiAdmin } from 'library/util'

/* ------------GET Method--------------- */

/*   앱 목록 조회  */
export const getSoftwareBoard = async ({ searchFilterParams, currentPage }) => {
  const param = {
    ...searchFilterParams,
    page: currentPage,
  }
  const response = await apiAdmin.get('/software-management/list', {
    params: param,
  })
  return response.data
}

/*   앱 상세 기본 정보 조회  */
export const getSoftwareBasicInformation = async ({ appsId }) => {
  const { data } = await apiAdmin.get(`/software-management/${appsId}/detail`)
  return data
}

/*   앱 버전 히스토리 목록 조회  */
export const getSoftwareHistoryVersionBoard = async ({ currentPage, size, appsId }) => {
  const param = {
    size,
    page: currentPage,
  }
  const response = await apiAdmin.get(`/software-management/${appsId}/history/list`, {
    params: param,
  })
  return response.data
}

/*   앱 버전 히스토리 상세 조회  */
export const getSoftwareHistoryVersion = async ({ releaseNumber }) => {
  const { data } = await apiAdmin.get(`/software-management/version/${releaseNumber}/detail`)
  return data
}

/* ------------POST Method--------------- */

/*   앱 추가  */
export const addSoftware = async ({ newSoftware }) => {
  return await apiAdmin.post(`/software-management/add`, newSoftware)
}

/*   앱 버전 히스토리 추가  */
export const addVersion = async ({ newVersion }) => {
  return await apiAdmin.post(`/software-management/version/add`, newVersion)
}

/*   앱 버전 히스토리 수정  */
export const modifyVersion = async ({ newEditVersion }) => {
  return await apiAdmin.post(`/software-management/version/modify`, newEditVersion)
}

export const modifySoftware = async ({ newSoftware }) => {
  return await apiAdmin.post(`/software-management/modify`, newSoftware)
}
/*   앱 삭제  */
export const deleteSoftware = async ({ deleteId }) => {
  return await apiAdmin.post(`/software-management/${deleteId}/delete`)
}

/*   앱 버전 히스토리 삭제  */
export const deleteVersion = async ({ deleteId }) => {
  return await apiAdmin.post(`/software-management/version/${deleteId}/delete`)
}
