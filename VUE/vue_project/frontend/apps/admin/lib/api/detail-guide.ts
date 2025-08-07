import { apiAdmin as api } from 'library/util'

const baseUrl = '/guidemanagement'

/* ------------GET Method--------------- */

/*   상세 지침서 목록 조회 */

export const getDetailGuide = async ({ searchFilterParams, currentPage }) => {
  const param = {
    ...searchFilterParams,
    page: currentPage,
  }
  const { data } = await api.get(`${baseUrl}/list`, {
    params: param,
  })

  return data
}

/* 상세 지침서 상세 내용 조회 */
export const getDetailGuideListDetail = async ({ guideNumber }) => {
  const { data } = await api.get(`${baseUrl}/${guideNumber}/detail`)

  return data
}

/* ------------Post Method--------------- */

/* 상세지침서  등록 */
export const addDetailGuide = async ({ params }) => {
  const { data } = await api.post(`${baseUrl}/add`, params)
  return data
}

/* 상세지침서 상세내용 수정 */
export const modifyDetailGuide = async ({ guideNumber, params }) => {
  const { data } = await api.post(`${baseUrl}/${guideNumber}/modify`, params)
  return data
}

/* 상세 지침서 삭제 */
export const deleteDetailGuide = async ({ guideNumber }) => {
  const { data } = await api.post(`${baseUrl}/${guideNumber}/delete`)
  return data
}
