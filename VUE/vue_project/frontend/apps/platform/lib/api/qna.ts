import { api } from 'library/util'

const baseUrl = 'board/qna'

/* ------------GET Method--------------- */

/* Qna 리스트를 조회 */
export const getQnaList = async ({ searchFilterParams, currentPage }) => {
  const param = {
    ...searchFilterParams,
    page: currentPage,
  }
  const { data } = await api.get(`${baseUrl}/list`, {
    params: param,
  })

  return data
}

/* Qna 상세 내용 조회 */
export const getQnaListDetail = async ({ qnaNum }) => {
  const { data } = await api.get(`${baseUrl}/${qnaNum}/detail`)
  return data
}

/* Qna 상세 답변 내용 조회 */
export const getQnaDetailAnswer = async ({ qnaNum }) => {
  const { data } = await api.get(`${baseUrl}/${qnaNum}/detail-answer`)
  return data
}
/* GET 해당 Qna 상세 댓글 및 대댓글 조회   */
export const getQnaComment = async ({ qnaNum }) => {
  const { data } = await api.get(`${baseUrl}/${qnaNum}/detail/comment`)
  return data
}
/* 공개여부 지정인원 선택시의 사용자를 검색 [완료] */

export const getQnaSearchMember = async ({ keyword = '' }) => {
  const { data } = await api.get(`${baseUrl}/search-member?keyword=${keyword}`)
  return data
}

/* Qna 카테고리별 List 조회[완료] */

export const getQnaCommonCode = async (sourceCodeItemNum) => {
  const { data } = await api.get(`/board/code/item-map-list?sourceCodeItemNum=${sourceCodeItemNum}`)
  return data
}

/* ------------POST Method--------------- */

/* Qna를 등록 [완료] */
export const postQnaAdd = async ({ params }) => {
  const { data } = await api.post(`${baseUrl}/add`, params)
  return data
}

/*   Qna 수정  */

export const modifyQna = async ({ qnaNum, params }) => {
  const { data } = await api.post(`${baseUrl}/${qnaNum}/modify`, params)
  return data
}
/* POST 해당 Qna 삭제  ] */

export const deleteQna = async ({ qnaNum }) => {
  const { data } = await api.post(`${baseUrl}/${qnaNum}/delete`)
  return data
}

/*  통합 문의 Qna 댓글을 등록   */

export const postQnaAddComment = async ({ qnaNum, params }) => {
  const { data } = await api.post(`${baseUrl}/${qnaNum}/comment/add`, params)
  return data
}

/* POST 해당 Qna 댓글 삭제   */

export const deleteQnaComment = async ({ qnaNum, qnaCmntNum }) => {
  const { data } = await api.post(`${baseUrl}/${qnaNum}/comment/${qnaCmntNum}/delete`)
  return data
}

/*  해당 Qna 댓글 수정  */

export const modifyQnaComment = async ({ qnaNum, qnaCmntNum, params }) => {
  const { data } = await api.post(`${baseUrl}/${qnaNum}/comment/${qnaCmntNum}/modify`, params)
  return data
}

/*  통합 문의 Qna 대댓글을 등록  */

export const postQnaAddReplyComment = async ({ qnaNum, qnaCmntNum, params }) => {
  const { data } = await api.post(`${baseUrl}/${qnaNum}/comment/${qnaCmntNum}/add`, params)
  return data
}
/*  통합 문의 Qna 대댓글을 수정  */

export const modifyQnaReplyComment = async ({ qnaNum, qnaCmntNum, prntQnaCmntNum, params }) => {
  const { data } = await api.post(`${baseUrl}/${qnaNum}/comment/${prntQnaCmntNum}/${qnaCmntNum}/modify`, params)
  return data
}
/*  통합 문의 Qna 대댓글을 삭제  */

export const deleteQnaReplyComment = async ({ qnaNum, qnaCmntNum, prntQnaCmntNum }) => {
  const { data } = await api.post(`${baseUrl}/${qnaNum}/comment/${prntQnaCmntNum}/${qnaCmntNum}/delete`)
  return data
}
