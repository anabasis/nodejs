import { apiLab as api } from 'library/util'

const customBaseUrl = 'partial-code'

/* ------------GET Method--------------- */

/* 알고리즘  커스텀 코드 리스트 조회 */
export const getAlgorithmCustomCodeList = async ({ searchFilterParams, currentPage }) => {
  const param = {
    ...searchFilterParams,
    page: currentPage,
  }

  const { data } = await api.get(`${customBaseUrl}/list`, {
    params: param,
  })

  return data
}

/*  알고리즘 커스텀 코드 상세 조회 */

export const getAlgorithmCustomCodeDetail = async ({ PartialCodeId }) => {
  const { data } = await api.get(`${customBaseUrl}/${PartialCodeId}`)
  return data
}
/* /*  알고리즘 커스텀 코드 전체 버전 조회 */

export const getAlgorithmCustomCodeVer = async ({ PartialCodeId, currentPage }) => {
  const { data } = await api.get(`${customBaseUrl}/${PartialCodeId}/version`)
  return data
}

/* /*  알고리즘 커스텀 코드 버전 목록 조회 */

export const getAlgorithmCustomCodeVers = async ({ PartialCodeId, currentPage }) => {
  const param = {
    size: 5,
    page: currentPage,
  }

  const { data } = await api.get(`${customBaseUrl}/${PartialCodeId}/versions`, {
    params: param,
  })
  return data
}

/* /*  알고리즘 커스텀 코드 버전 상세 조회 */

export const getAlgorithmCustomCodeDetailVer = async ({ PartialCodeId, PartialCodeVerId }) => {
  const { data } = await api.get(`${customBaseUrl}/${PartialCodeId}/version/${PartialCodeVerId}`)
  return data
}

/* ------------POST Method--------------- */

/* 커스텀코드 생성 */

export const addAlgoCustom = async ({ params }) => {
  const { data } = await api.post(`${customBaseUrl}`, params)
  return data
}
/* Partial Code의 버전 생성 */

export const addAlgoCustomVer = async ({ params, PartialCodeId }) => {
  const { data } = await api.post(`${customBaseUrl}/${PartialCodeId}/version`, params)
  return data
}

/* ------------Put Method--------------- */
export const putAlgoCustom = async ({ params, PartialCodeId }) => {
  const { data } = await api.put(`${customBaseUrl}/${PartialCodeId}`, params)
  return data
}

/* ------------Delete Method--------------- */

/* 커스텀코드 버전 삭제 */

export const deleteAlgorithmLibVer = async ({ PartialCodeId, PartialCodeVerId }) => {
  const { data } = await api.delete(`${customBaseUrl}/${PartialCodeId}/version/${PartialCodeVerId}`)
  return data
}
