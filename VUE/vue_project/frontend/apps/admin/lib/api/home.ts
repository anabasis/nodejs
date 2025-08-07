import { apiAdmin as api } from 'library/util'

const baseUrl = '/home'

/* ------------GET Method--------------- */

/* QnA 조회 [완료] */

export const getQnaHome = async ({ params, currentPage }) => {
  const param = {
    ...params,
    page: currentPage,
  }
  const { data } = await api.get(`${baseUrl}/qna/list`, {
    params: param,
  })

  return data
}

/* 답변 대기 중인 QnA 건수 조회 */
export const getQnaHomeWaitCount = async () => {
  const { data } = await api.get(`${baseUrl}/assigned-qna/count`)

  return data
}

/* QnA 댓글 수 조회 */

export const getQnaHomeCommentCount = async () => {
  const { data } = await api.get(`${baseUrl}/qna-comment/count`)

  return data
}
/*   공지사항 조회 */

export const getHomeNotice = async () => {
  const { data } = await api.get(`${baseUrl}/notice`)

  return data
}

/*  NewCo 가입요청 및 미가입 회원수 조회 */

export const getHomeNewcoReqCount = async () => {
  const { data } = await api.get(`${baseUrl}/newco-user/request/count`)

  return data
}

/* NewCo 기업현황 조회 */

export const getHomeNewcoCorporate = async () => {
  const { data } = await api.get(`${baseUrl}/newco-user/corporate/count`)

  return data
}

/* HQ 가입요청 및 미가입 회원수 조회 */

export const getHomeHqUserCount = async () => {
  const { data } = await api.get(`${baseUrl}/hq-user/request/count`)

  return data
}
