import { CommonSelectOptionType, ListParamsType, ListReturnType, FileResType } from 'library/type/common'

/* Qna Select Type */

export type QnaCommonCodes = {
  module: CommonSelectOptionType[]
  type: CommonSelectOptionType[]
  category: CommonSelectOptionType[]
  status?: CommonSelectOptionType[]
  openLevel?: CommonSelectOptionType[]
}

/* Qna List Return Type */

type QnaListContentType = {
  qnaNum: number
  qnaTpCd: string
  qnaCatCd: string
  mdlTpCd: string
  inqrTitl: string
  qnaStsCd: string
  usrNm: string
  createDate: string
  modifyDate: string
  status: string
}

export type QnaListReturnType = ListReturnType & {
  content: QnaListContentType[]
}

/* Qna Add Init Params Type */

export type QnaParamsType = Partial<ListParamsType> & { size: number }
type PrtnUserType = {
  userUid: string
  prtlyOpenNum?: number
}

export type QnaAddInitParamsType = {
  type: string
  category: string
  module: string
  title: string
  content: string
  openLevel: string
  prtnUser?: PrtnUserType[]
  qnaAttachResponse?: FileResType[]
  status?: string
}

/* Qna Detail Type */

export type QnaDetailType = QnaAddInitParamsType & {
  qnaNum: number
  userUid: string
  writer: string
  status: string
  createDate: string
  modifyDate: string
  qnaStatus: string
  qnaCategory: string
  qnaType: string
  qnaModule: string
  prtnUser: PrtnUserType[]
  qnaAttachResponse: FileResType[]
  openLevelCode: string
}

/* Qna Detail Answer Detail Type */
export type QnaDetailAnswerType = {
  answerNumber: number
  answerUserUid: string
  writer: string
  title: string
  answerContent: string
  createDate: string
  modifyDate: string
  answerAttachmentResponse: FileResType[]
}

export type CommentType = {
  cmnt: string
  createDate: string
  crtrUid: string
  delYn: string
  modifyDate: string
  prntQnaCmntNum: number
  qnaCmntNum: number
  qnaNum: number
  usrNm: string
}

export type CommentViewType = {
  comment: CommentType
}

export type ReplyCommentType = {
  qnaCmntNum: number
  commentData: CommentType[]
}

export type OpenLevelType = {
  prtlyOpenNum?: number
  iconFile?: FileResType
  organizationName?: string
  organizationNumber?: number
  userName?: string
  userUid: string
}
