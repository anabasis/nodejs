import { ListReturnType, FileResType } from 'library/type/common'

/* DetailGuide Params Type */

export type DetailGuideParamsType = {
  periodFromDate?: string
  periodToDate?: string
  size: number
  keywordName?: string
  keyword?: string
  displayStartDate?: string
  displayEndDate?: string
}

/* DetailGuide List Return Type */

type DetailGuideListContentType = {
  guideNumber: number
  title: string
  moveParameter: string
  createDate: string
}

export type DetailGuideListReturnType = ListReturnType & {
  content: DetailGuideListContentType[]
}

/* DetailGuide Add */

export type DetailGuideAddParamsType = {
  guideNumber?: number
  title: string
  moveParameter: string
  guideAttachmentRequestList: FileResType[]
}

/* DetailGuide Detail */
export type DetailGuideDetailReturnType = {
  guideNumber: number
  title: string
  moveParameter: string
  createUid: string
  createDate: string
  modifierUid: string
  modifyDate: string
  guideAttachmentRequestList: FileResType[]
}
