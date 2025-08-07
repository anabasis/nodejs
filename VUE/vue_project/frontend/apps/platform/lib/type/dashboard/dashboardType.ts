import { FileResType } from 'library/type/common'
export interface ProductCategoryType {
  dissCatNm: string
  count: number
}

export interface PurposeType {
  purpose: string
  purposeCount: number
}

export interface RegionStatusType {
  continentName: string
  continentCount: number
}

export interface CorporateType {
  corporateNumber: number
  corporateName: string
  corporateCount: number
}

export interface ProcessType {
  name: string
  count: number
}

export interface CountryType {
  countryName: string
  projectCount: number
}

export interface ResponseType<ObjectType> {
  content: ObjectType[]
  pageable: {
    sort: { unsorted: boolean; sorted: boolean; empty: boolean }
    pageNumber: number
    pageSize: number
    offset: number
    unpaged: number
    paged: boolean
  }
  totalElements: number
  totalPages: number
  last: boolean
  numberOfElements: number
  first: boolean
  size: number
  number: number
  sort: {
    unsorted: boolean
    sorted: boolean
    empty: boolean
  }
  empty: boolean
}

export interface MyProjectsNewsType {
  title: string
  content: string
  notfCd: string
  notfTpCd: string
  lndgUrl: string
  langCd: string
  toUsrUid: string
  crtrUid: string
  mdfrUid: string
  crtDt: string
  mdfDt: string
  prjNm: string
  dissCatCd: string
}

export interface NoticeType {
  noticeNumber: number
  noticeTypeCode: string
  noticeType: string
  noticeCategoryCode: string
  noticeCategory: string
  title: string
  createDate: string
}

export interface ToolType {
  toolRauncherIcon: FileResType
  favNum: number
  toolId: number
  toolName: string
  toolLink: string
}

export interface UrlType {
  favNum: number
  urlName: string
  url: string
}
export interface LatelyPageType {
  title: string
  content: string
  visitTime: string
  url: string
}

export interface BookmarkToolType {
  toolRauncherIcon: FileResType
  toolId: number
  toolName: string
  toolLink: string
}
