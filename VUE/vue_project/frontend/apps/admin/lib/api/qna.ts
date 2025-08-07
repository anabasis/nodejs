import { apiAdmin as api } from 'library/util'

const baseUrl = 'helpdesk/qna'

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

/* QnA 담당자를 조회 */

export const getQnaManager = async ({ qnaNum, keyword }) => {
  const { data } = await api.get(`${baseUrl}/${qnaNum}/searchManager?keyword=${keyword}`)
  return data
}

/*QnA 카테고리 모듈 담당자를 상세 정보 조회  */

export const getQnaCatModuleManagerDetail = async ({ category, module }) => {
  const { data } = await api.get(`${baseUrl}/management/${category}/${module}/list`)
  return data
}

/* QnA 카테고리 모듈 담당자 수 조회 */

export const getQnaCateModuleManagerCount = async ({ category, module }) => {
  const { data } = await api.get(`${baseUrl}/management/${category}/${module}/detail/user/count`)
  return data
}

/* QnA 카테고리 모듈 담당자 정보를 조회 */

export const getQnaCateModuleManagerInfoList = async ({ category, module, currentPage, pageSize }) => {
  const params = {
    page: currentPage,
    size: pageSize,
  }
  const { data } = await api.get(`${baseUrl}/management/${category}/${module}/detail/user-list`, { params })
  return data
}

/*QnA 카테고리 모듈 담당자 검색 */

export const getQnaCateModuleManager = async ({ category, module, keyword }) => {
  const { data } = await api.get(`${baseUrl}/management/${category}/${module}/detail/search-user?keyword=${keyword}`)
  return data
}
/*QnA 카테고리별 모듈별 담당자 목록 조회 */

export const getQnaCateModuleManagerList = async ({ searchFilterParams, currentPage }) => {
  const param = {
    ...searchFilterParams,
    page: currentPage,
  }
  const { data } = await api.get(`${baseUrl}/management/list`, { params: param })
  return data
}
/* Qna 카테고리별 List 조회 */

export const getQnaCateModuleList = async ({ sourceCodeItemNum }) => {
  const { data } = await api.get(`${baseUrl}/code/item-map-list?sourceCodeItemNum=${sourceCodeItemNum}`)
  return data
}

/* ------------POST Method--------------- */

/*      QnA 답변 등록 */
export const addQnaAnswer = async ({ qnaNum, params }) => {
  const { data } = await api.post(`${baseUrl}/${qnaNum}/detail/answer/add`, params)
  return data
}
/*  QnA 답변 수정   */
export const editQnaAnswer = async ({ qnaNum, answerNumber, params }) => {
  const { data } = await api.post(`${baseUrl}/${qnaNum}/answer/${answerNumber}/modify`, params)
  return data
}

/*    Qna 댓글 등록   */
export const addQnaComment = async ({ qnaNum, params }) => {
  const { data } = await api.post(`${baseUrl}/${qnaNum}/comment/add`, params)
  return data
}

/*  Qna 댓글 수정  */
export const editQnaComment = async ({ qnaNum, qnaCmntNum, params }) => {
  const { data } = await api.post(`${baseUrl}/${qnaNum}/comment/${qnaCmntNum}/modify`, params)
  return data
}
/*   Qna 댓글 삭제  */
export const deleteQnaComment = async ({ qnaNum, qnaCmntNum }) => {
  const { data } = await api.post(`${baseUrl}/${qnaNum}/comment/${qnaCmntNum}/delete`)
  return data
}

/*   Qna 대댓글 등록  */
export const addQnaReplyComment = async ({ qnaNum, qnaCmntNum, params }) => {
  const { data } = await api.post(`${baseUrl}/${qnaNum}/comment/${qnaCmntNum}/add`, params)
  return data
}

/*  Qna 대댓글 삭제   */
export const deleteQnaReplyComment = async ({ qnaNum, prntQnaCmntNum, qnaCmntNum }) => {
  const { data } = await api.post(`${baseUrl}/${qnaNum}/comment/${prntQnaCmntNum}/${qnaCmntNum}/delete`)
  return data
}

/*  Qna 대댓글 수정   */
export const editQnaReplyComment = async ({ qnaNum, prntQnaCmntNum, qnaCmntNum, params }) => {
  const { data } = await api.post(`${baseUrl}/${qnaNum}/comment/${prntQnaCmntNum}/${qnaCmntNum}/modify`, params)
  return data
}

/* QnA 담당자를 지정  */
export const addQnaManager = async ({ qnaNum }) => {
  const { data } = await api.post(`${baseUrl}/${qnaNum}/updateManager`)
  return data
}

/* QnA 카테고리 모듈 담당자 추가  */

export const addQnaCategoryManager = async ({ category, module, usrUid }) => {
  const { data } = await api.post(`${baseUrl}/management/${category}/${module}/detail/add`, usrUid)
  return data
}

/*   QnA 카테고리 및 모듈 초기화  */
export const resetQnaCategory = async ({ qnaNum, params }) => {
  const { data } = await api.post(`${baseUrl}/${qnaNum}/resetManager`, params)
  return data
}
/* QnA 카테고리 모듈 담당자 삭제 */

export const deleteQnaCategoryManager = async (params) => {
  const { data } = await api.post(`${baseUrl}/management/detail/delete`, params)
  return data
}
