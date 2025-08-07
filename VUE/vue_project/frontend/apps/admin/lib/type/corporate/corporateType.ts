import { CommonSelectOptionType, ListReturnType } from 'library/type/common'

export type ListParamsType = {
  corpLvlCd?: string
  cntryCd?: string
  corpStsCd?: string
  corpNm?: string
  periodFromDate?: string
  periodToDate?: string
  size: number
  page: number
  displayStartDate?: string
  displayEndDate?: string
}

// params Type
export type CorporateParamsType = Partial<ListParamsType>

//commoncode list
export type CorporateReturnType = ListReturnType & {
  content: CorporateContent[]
}
type CorporateContent = {
  corporateLevelCode?: string
  corporateStatusCode?: string
  corporationName?: string
  corporationNum?: number
  createDate?: string
  memberCount?: number
  nation?: string
  otpAuthYn: string
}

export type CorporateCommonCodes = {
  corporateLevel: CommonSelectOptionType[]
  status: CommonSelectOptionType[]
}
//기업관리 목록
export type Corporate = {
  corporateLevelCode?: string
  corporateStatusCode?: string
  corporationName?: string
  corporationNum?: number
  createDate?: string
  memberCount?: number
  nation?: string
}

// 기업관리 상세
//BasicInformation
export type CorporateBasicInfo = {
  corporationNum?: number
  corporationName?: string
  corporateLevelCode?: string
  nation?: string
  corporateStatusCode?: string
  domain?: string
  representativeEmailAddress?: string
  description?: string
  memberCount?: number
  roleLevel?: string
  managerUserId: string
  managerUserUuId: string
  createDate?: string
  otpAuthYn: string
}

//Corporate프로젝트
export type CorporateProject = {
  projectNum?: number
  diseaseCategoryName?: string
  targetMarket?: string
  projectPurposeCode?: string
  projectName?: string
  corporationName?: string
  processCodeName?: string
  endDate?: string
  length?: number
}

//Corporate멤버
export type CorporateMember = {
  userUid?: string
  fullName?: string
  emailId?: string
  organizationName?: string
  jobTitleName?: string
  userRoleName?: string
  createDate?: string
  memberCount?: number
  length?: number
  userStatusCode: string
}

//기업관리 추가
export type CorporateForm = {
  corporateLevelCode: string
  corporationName: string
  representativeEmailAddress: string
  domainName: string
  description?: string
  roleLevel?: string
  corporateStatusCode: string
  nation: string
  managerUserId: string
  otpAuthYn: string
}

//회원목록(Representative)
export type RepresentativeUserList = {
  userStatusCode?: string
  corporateLevelCode?: string
  userUid?: string
  nation?: string
  corporationName?: string
  fullName?: string
  emailId?: string
  userRolName?: string
  jobTitleName?: string
  organizationName?: string
  createDate?: string
}

//국가목록
export type CountryList = {
  countryCd: string
  korCountryNm: string
  engCountryNm: string
  nativeCountryNm: string
}
