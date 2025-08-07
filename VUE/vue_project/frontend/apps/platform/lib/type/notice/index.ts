import { CommonSelectCodesType, ListParamsType, ListReturnType } from 'library/type/common'

export type NoticeCommonCodesType = Pick<CommonSelectCodesType, 'category'>

export type NoticeParamsType = Partial<Pick<ListParamsType, 'startDate' | 'endDate' | 'displayEndDate' | 'displayStartDate'>> & {
  size: number
  noticeCategoryTab?: string
  keywordTab?: string
  keyword?: string
}

/* Notice List Return Type */

type NoticeListContentType = {
  ntcNum: number
  ntcTpCd: string
  ntcCatCd: string
  titl: string
  usrNm: string
  crtDt: string
}

export type NoticeListReturnType = ListReturnType & {
  content: NoticeListContentType[]
}

type NoticeNoticeDetailFlResponsesType = {
  fileNumber: number
  fileName: string
  displayFileName: string
  fileExtension: string
  filePath: string
  fileSize: number
  storageTypeCode: string
  tableName: string
}

type NoticeDetailMlgResponseType = {
  content: string
  langCode: string
  title: string
}

export type NoticeDetailReturnType = {
  noticeCreateDate: string
  fileInfoResponses: NoticeNoticeDetailFlResponsesType[]
  noticeDetailMlgResponse: NoticeDetailMlgResponseType
  noticeNum: number
  noticeType: string
  noticeWriter: string
}
