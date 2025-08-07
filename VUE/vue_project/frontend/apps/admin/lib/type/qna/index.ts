import { FileResType, CommonSelectOptionType, ListReturnType, ListParamsType } from 'library/type/common'

/* Qna Select Type */

export type QnaCommonCodes = {
  module: CommonSelectOptionType[]
  type: CommonSelectOptionType[]
  category: CommonSelectOptionType[]
  status?: CommonSelectOptionType[]
  openLevel?: CommonSelectOptionType[]
}
/* Qna Add Init Params Type */

export type QnaAdminParamsType = Partial<Omit<ListParamsType, 'startDate' | 'endDate'>> & {
  periodFromDate?: string
  periodToDate?: string
  size: number
}

/* QnA Detail Type */

export type QnaDetailType = {
  qnaNum: string
  qnaTpCd: string
  qnaCatCd: string
  mdlTpCd: string
  openLevel: string
  inqrTitl: string
  inqrCont: string
  usrUid: string
  usrNm: string
  mngrUsrUid: string
  qnaStsCd: string
  createDate: string
  modifyDate: string
  qnaAttachResponse: FileResType[]
  status: string
  category: string
  type: string
}
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

/* Qna List Return Type */
type QnaAdminContentType = {
  qnaNumber: number
  type: string
  category: string
  module: string
  title: string
  content: string
  writer: string
  status: string
  createDate: string
  modifyDate: string
  qnaStsCd: string
}
/* Qna Manage List Return Type */
type QnaAdminMangeContentType = {
  no: number
  ctCd: string
  ctCdNm: string
  mdCd: string
  mdCdNm: string
  mbrCnt: number
  modifyDate: string
}

type QnaUserAttachResponseType = {
  fileNumber: number
  fileName: string
  displayFileName: string
  fileExtension: string
  filePath: string
  fileSize: number
  storageTypeCode: string
  tableName: string
  preSignedUrl: string
}

type QnaAdminMangeUserContentType = {
  usrUid?: string
  userAttachResponse: QnaUserAttachResponseType
  moduleManagerNum?: number
  usrNm: string
  orgnName: string
  jobTitle?: string
  modifyDate?: string
}

export type QnaManageMeberType = {
  usrUid: string
}

export type QnaManageMeberListType = {
  userAttachResponse: FileResType
  usrUid: string
  usrNm: string
  orgnName: string
  modifyDate?: string
}

export type QnaManageDetailType = QnaAdminMangeContentType

export type QnaAdminListReturnType = ListReturnType & {
  content: QnaAdminContentType[]
}
export type QnaAdminManageListReturnType = ListReturnType & {
  content: QnaAdminMangeContentType[]
}

export type QnaAdminManageUserListReturnType = ListReturnType & {
  content: QnaAdminMangeUserContentType[]
}

export type CommentType = {
  qnaCommentNumber: number
  parentQnaCommentNumber: number
  comment: string
  deleteYn: string
  writeUserUid: string
  writeUserName: string
  userUid: string
  createUid: string
  createDate: string
  modifierUid: string
  modifyDate: string
}

export type CommentViewType = {
  comment: CommentType
}

export type ReplyCommentType = {
  qnaCmntNum: number
  commentData: CommentType[]
}
