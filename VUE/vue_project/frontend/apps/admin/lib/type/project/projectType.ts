import { FileResType } from 'library/type/common'

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

export interface ProjectListType {
  id: number
  targetMarket: string
  dissCatCd: string
  purpose: string
  prjNm: string
  process: string
  corporate: string
  dueDate: string
  projectRoleCode: string
  prjStsCd: string
  prjStsNm: string
}

export interface ProcessListType {
  id: string
  prcsNm: string
  sortNum: number
}

export interface ProjectFilterType {
  startDate?: string
  endDate?: string
  diseaseCategoryCode?: string
  purposeCode?: string
  processCode?: string
  keyword?: string
  displayStartDate?: string
  displayEndDate?: string
  size?: number
}

export interface ProjectDetailType {
  id: number
  purposeCd: string
  purposeNm?: string
  dissCatCd: string
  startDat: string
  endDat: string
  corporateNm?: string
  corporateCd: number
  prjNm: string
  prjDscrp: string
}

export interface ProjectMemberType {
  prjMbrNum?: number
  usrUid: string
  usrNm: string
  orgnNm: string
  jobTitle: string
  projectManagerYn: 'Y' | 'N'
  guestYn: 'Y' | 'N'
  prcsRolCd: {
    processRoleCode: string
    processRoleCodeName?: string
    processCodes: string[]
    processName?: string[]
  }[]
  fileInfoResponse: null | FileResType
}

export interface MemberOperationType {
  projectMemberOperation: 'ADD' | 'UPDATE' | 'DELETE'
  memberId: string
  projectManagerYn: 'Y' | 'N'
  memberProcess: { processRoleCode: string; processCodes: string[] }[]
}

export interface ProjectProcessType {
  id: number
  prjNum: number
  prcsCd: string
  prcsNm: string
  prcsStsCd: string
  prcsStsNm: string
}

export interface CorporateType {
  corporationNum: number
  corporationName: string
  corporateLevelCode: string
  nation: string
  corporateStatusCode: string
  memberCount: number
  createDate: string
}

export interface UserType {
  userStatusCode: string
  corporateLevelCode: string
  userUid: string
  nation: string
  corporationName: string
  fullName: string
  emailId: string
  userRolName: string
  jobTitleName: string
  organizationName: string
  createDate: string
  filePath: FileResType | null
}

export interface ProjectProcessType {
  id: number
  prjNum: number
  prcsCd: string
  prcsNm: string
  prcsStsCd: string
  prcsStsNm: string
}
