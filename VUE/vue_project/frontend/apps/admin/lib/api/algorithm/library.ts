import { apiLab as api } from 'library/util'

const libBaseUrl = 'lib'

/* ------------GET Method--------------- */

/* 알고리즘  라이브러리 리스트 조회 */
export const getAlgorithmLibList = async ({ searchFilterParams, currentPage }) => {
  const param = {
    ...searchFilterParams,
    page: currentPage,
  }

  const { data } = await api.get(`${libBaseUrl}/list`, {
    params: param,
  })

  return data
}

/* 라이브러리의 전체 버전 조회 */
export const getAlgorithmLibVerList = async ({ libId }) => {
  const { data } = await api.get(`${libBaseUrl}/${libId}/version`)

  return data
}

/* 라이브러리의 전체 버전 목록 */
export const getAlgorithmLibVerLists = async ({ libId, currentPage }) => {
  const param = {
    size: 5,
    page: currentPage,
  }
  const { data } = await api.get(`${libBaseUrl}/${libId}/versions`, {
    params: param,
  })

  return data
}

/* 알고리즘 라이브러리 상세 조회 */

export const getAlgorithmLibListDetail = async ({ libId }) => {
  const { data } = await api.get(`${libBaseUrl}/${libId}`)
  return data
}
/* 라이브러리의 상세 버전 조회 */

export const getAlgorithmLibVerDetail = async ({ libId, libVerId }) => {
  const { data } = await api.get(`${libBaseUrl}/${libId}/version/${libVerId}`)
  return data
}

/* 라이브러리의 특정 버전 다운로드 */

export const getAlgorithmLibDownolad = async ({ libVerId }) => {
  const { data } = await api.get(`${libBaseUrl}/${libVerId}/download`, { responseType: 'blob' })

  return data
}

/* 라이브러리 이름으로 조회 */

export const getAlgoNameVer = async ({ libName }) => {
  const { data } = await api.get(`${libBaseUrl}/name/${libName}`)
  return data
}

/* ------------POST Method--------------- */

/* 라이브러리 생성 */

export const addAlgorithmLib = async ({ params }) => {
  const { data } = await api.post(`${libBaseUrl}`, params)
  return data
}
/* 라이브러리의 버전 생성 */

export const addAlgorithmLibVer = async ({ formData, libId }) => {
  const { data } = await api.post(`${libBaseUrl}/${libId}/version`, formData)
  return data
}
/* ------------Put Method--------------- */

/* 라이브러리 수정 */

export const putAlgorithmLibVer = async ({ params, libId }) => {
  const { data } = await api.put(`${libBaseUrl}/${libId}`, params)
  return data
}

/* ------------Delete Method--------------- */

/* 라이브러리 버전 삭제 */
export const deleteAlgorithmLibVer = async ({ libId, libVerId }) => {
  const { data } = await api.delete(`${libBaseUrl}/${libId}/version/${libVerId}`)
  return data
}
