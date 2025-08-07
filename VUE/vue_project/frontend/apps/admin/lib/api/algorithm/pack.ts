import { apiLab as api } from 'library/util'

const packBaseUrl = 'algorithm'

/* 알고리즘 Pack 리스트 조회 */
export const getAlgorithmPackList = async ({ searchFilterParams, currentPage }) => {
  const param = {
    ...searchFilterParams,
    page: currentPage,
  }

  const { data } = await api.get(`${packBaseUrl}/list`, {
    params: param,
  })

  return data
}
/*  알고리즘 Pack 상세 조회 */

export const getAlgorithmPackDetail = async ({ algoPackId }) => {
  const { data } = await api.get(`${packBaseUrl}/${algoPackId}`)
  return data
}

/* ------------POST Method--------------- */

export const postAlgorithmPack = async ({ params }) => {
  const { data } = await api.post(`${packBaseUrl}`, params)
  return data
}
/* ------------PUT Method--------------- */

export const putAlgorithmPack = async ({ algoPackId, status, params }) => {
  const { data } = await api.put(`${packBaseUrl}/${algoPackId}?status=${status}`, params)
  return data
}

/* ------------Delete Method--------------- */

/* Algorithm Pack 삭제 */
export const deleteAlgorithmPack = async ({ algoPackId }) => {
  const { data } = await api.delete(`${packBaseUrl}/${algoPackId}`)
  return data
}
