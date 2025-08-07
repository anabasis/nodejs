import { ListParamsType, ListReturnType } from 'library/type/common'

// User Role List 조회 검색 타입
export type UserRoleSearchParamType = Partial<Pick<ListParamsType, 'size' | 'startDate' | 'endDate' | 'displayEndDate' | 'displayStartDate'>> & {}

// User Role list API 응답 타입
export type UserRoleListReturnType = ListReturnType & {
  content: UserRoleListType[]
}

// User Role list 정보 타입
export type UserRoleListType = {
  usrRolNumber: number
  corpLvCode: string
  roleLvCode: string
  usrRolName: string
  usrCount: number
  mdfDate: string
}

// 사용자 역할 기본 정보 타입
export type UserRoleInfoType = {
  userRoleNumber?: number
  userRoleName: string
  corpLvCode: string
  usrRolCode: string
  roleLvCode: string
  modifyDate?: string
}

// 사용자 역할 메뉴 권한 정보 타입
export type UserRoleMenuAuthorityType = {
  parentsMenuNumber: number
  devMnuPerMsnNumber: number
  parentsMenuName: string
  menuNumber: number
  menuName: string
  readYn: string
  createYn: string
  updateYn: string
  deleteYn: string
  depth?: number
  cnt?: number
  childrenData?: UserRoleMenuAuthorityType[]
}

// 사용자 역할 해당 인원 리스트 조회 조건 타입
export type UserRoleMemberListSearchType = Partial<Pick<ListParamsType, 'size'>> & {}

// 사용자 역할 추가할 인원 리스트 조회 조건 타입
export type UserRoleMemberAddListSearchType = {
  keyword?: string
  searchType: string
}

// 사용자 역할 인원 API 응답 타입
export type UserRoleMemberReturnType = ListReturnType & {
  content: UserRoleMemberType[]
}

// 사용자 역할 인원 정보 타입
export type UserRoleMemberType = {
  usrUid: string
  usrNm: string
  emlId: string
  orgnNm: string
  usrRolNum: number
  usrRolNm: string
  jobTitl: string
  jobNm: string
  corpNm: string
}

// 사용자 역할 변경 or 추가된 인원 정보 타입
export type UserRoleModifiedMemberType = {
  usrUid: string
  procTp: string
  modifyUsrRoleNum?: number
}

// 사용자 역할 변경 정보 모음 타입
export type UserRoleModifiedCompleteType = {
  corpLv: string
  roleLv: string
  userRolCd: string
  userRoleName: string
  authorityUserGnbDtoList: UserRoleMenuAuthorityType[]
  authorityUserLnbDtoList: UserRoleMenuAuthorityType[]
}
