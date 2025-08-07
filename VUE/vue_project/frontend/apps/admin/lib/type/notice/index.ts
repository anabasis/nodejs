import { CorporatePartiallyType, ListParamsType, ListReturnType, CommonSelectOptionType } from 'library/type/common'

/* Notice List Select Option Type  */

type NoticeSelectOptnType = CommonSelectOptionType & {
  hidden?: boolean
}

export type NoticeCommonCodesType = {
  category: NoticeSelectOptnType[]
  type?: NoticeSelectOptnType[]
  openLevel?: NoticeSelectOptnType[]
  exposureTypeCode?: NoticeSelectOptnType[]
  exposurePeriodTypeCode?: NoticeSelectOptnType[]
  exposureFrequencyCode?: NoticeSelectOptnType[]
  corporate?: NoticeSelectOptnType[]
  langCode?: NoticeSelectOptnType[]
}

/* Notice Params Type */

export type NoticeParamsType = Partial<Pick<ListParamsType, 'category' | 'startDate' | 'endDate' | 'displayEndDate' | 'displayStartDate'>> & {
  size: number
  keywordName?: string
  keyword?: string
}

/* Notice List Return Type */

type NoticeListContentType = {
  noticeNumber: number
  noticeType: string
  noticeTypeCode: string
  noticeCategory: string
  title: string
  writer: string
  createDate: string
  languageCount: number
}

export type NoticeListReturnType = ListReturnType & {
  content: NoticeListContentType[]
} /* Notice Add */
type NoticePartnerType = {
  corporateNumber: number
  corporateName: string
  country: string
}

export type NoticeAddParamsType = {
  noticeTypeCode: string
  noticeCategoryCode: string
  exposureTypeCode?: string
  exposurePeriodTypeCode?: string
  exposureFrequencyCode?: string
  openLevelCode: string
  noticeAttachmentRequests?: NoticeAttachmentType[]
  noticeAttachment?: NoticeAttachmentType[]
  noticeMultiLanguage?: NoticeMultiLanguageType[]
  noticePartiallyOpenRequests?: {
    corporateNumber: number
  }
  noticePartiallyOpen?: NoticePartnerType[]
  partiallyOpenRequests?: NoticePartnerType[]
}

/* Notice Detail */
export type NoticeDetailReturnType = {
  noticeNumber: number
  title: string
  noticeTypeCode: string
  noticeType: string
  noticeCategoryCode: string
  noticeCategory: string
  openLevelCode: string
  openLevel: string
  exposureFrequency?: string
  exposurePeriodTypeCode?: string
  exposurePeriodType?: string
  createDate: string
  noticePartiallyOpen?: CorporatePartiallyType[]
  exposureFrequencyCode?: string
  noticeAttachment?: NoticeAttachmentType[] // 여기에 첨부 파일과 관련된 정의를 추가하세요
  noticeMultiLanguage: NoticeMultiLanguageType[]
}

type NoticeAttachmentType = {
  fileNumber: number
  fileName: string
  displayFileName: string
  fileExtension: string
  filePath: string
  fileSize: number
  storageTypeCode: string
  tableName: string
}

type NoticeMultiLanguageType = {
  noticeMultilanguageNumber?: number
  noticeNumber?: number
  languageCode: string
  language?: string
  title?: string
  content?: string
}

export type NewNoticeEditorType = Omit<NoticeMultiLanguageType, 'noticeMultilanguageNumber' | 'noticeNumber'> & {
  id: string
}
