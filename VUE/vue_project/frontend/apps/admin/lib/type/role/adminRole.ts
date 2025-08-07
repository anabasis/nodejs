import { ListParamsType, ListReturnType } from 'library/type/common'

// Admin Role List 조회 검색 타입
export type AdminRoleSearchParamType = Partial<Pick<ListParamsType, 'size' | 'startDate' | 'endDate' | 'displayEndDate' | 'displayStartDate'>> & {}

// Admin Role list API 응답 타입
export type AdminRoleListReturnType = ListReturnType & {
  content: AdminRoleListType[]
}

// Admin Role list 정보 타입
export type AdminRoleListType = {
  adminRoleNumber: number
  adminRoleCode: string
  adminRoleName: string
  adminRoleCount: number
  modifyDate: string
}

// 어드민 역할 기본 정보 타입
export type AdminRoleInfoType = {
  adminRoleNumber?: number
  adminRoleCode: string
  adminRoleName: string
  modifyDate?: string
}

// 어드민 역할 메뉴 권한 정보 타입
export type AdminRoleMenuAuthorityType = {
  parentsMenuNumber: number
  admMnuPermsnNumber: number
  parentsMenuName: string
  menuNumber: number
  menuName: string
  readYn: string
  createYn: string
  updateYn: string
  deleteYn: string
  depth?: number
  cnt?: number
  childrenData?: AdminRoleMenuAuthorityType[]
}

// 어드민 역할 해당 인원 리스트 조회 조건 타입
export type AdminRoleMemberListSearchType = Partial<Pick<ListParamsType, 'size'>> & {}

// 어드민 역할 추가할 인원 리스트 조회 조건 타입
export type AdminRoleMemberAddListSearchType = {
  keyword?: string
  searchType: string
}

// 어드민 역할 인원 API 응답 타입
export type AdminRoleMemberReturnType = ListReturnType & {
  content: AdminRoleMemberType[]
}

// 어드민 역할 인원 정보 타입
export type AdminRoleMemberType = {
  usrUid: string
  usrNm: string
  emlId: string
  orgnNm: string
  usrRolNum?: number
  usrRolNm: string
  admRoleNum?: number
  admRoleNm: string
  jobTitl: string
  jobNm: string
  corpNm: string
  adminRoleList?: string[]
}

// 어드민 역할 변경 인원에 젹용될 역할 리스트 타입
export type AdminRoleModifiedListType = {
  admRolAplNum: number
  admRolNum: number
  procTp: string
}

// 어드민 역할 변경할 인원 정보 타입
export type AdminRoleModifiedMemberType = {
  usrUid: string
  admRoleList?: AdminRoleModifiedListType[]
}

// 사용자 역할 변경 정보 모음 타입
export type AdminRoleModifiedCompleteType = {
  adminRoleCode: string
  adminRoleName: string
  authorityAdminRoleGnbList: AdminRoleMenuAuthorityType[]
  authorityAdminRoleLnbList: AdminRoleMenuAuthorityType[]
}

// 사용자 역할 변경 정보 모음 타입
export type AdminRoleAddedType = {
  adminRoleCode: string
  adminRoleName: string
  authorityAdminRoleGnbList: AdminRoleMenuAuthorityType[]
  authorityAdminRoleLnbList: AdminRoleMenuAuthorityType[]
  usrUidList: string[]
}
