import { ListParamsType, ListReturnType } from 'library/type/common'

/*----------------------------------------Seegene User-------------------------------------*/

// seegene 가입 완료 리스트 API 조회 응답 타입
export type SeegeneCompleteListReturnType = ListReturnType & {
  content: SeegeneCompleteUser[]
}

// seegene 가입 완료 리스트 정보 타입
export type SeegeneCompleteUser = {
  userUUID: string
  userName: string
  email: string
  organization: string
  jobTitle: string
  usrStsCd: string
  userRoleName: string
  userRolReqCount: number
  adminRoleName?: string
  adminRolReqCount?: number
  registerDate: string
  registerGb: string
}

// seegene 가입 진행 중 리스트 API 조회 응답 타입
export type SeegeneProgressUserReturnType = ListReturnType & {
  content: SeegeneProgressUser[]
}

// seegene 가입 진행 중 리스트 정보 타입
export type SeegeneProgressUser = {
  userUUID: string
  userName: string
  emailId: string
  organization?: string
  jobTitle?: string
  joinTpCd: string
  receiptDate: string
}

// seegene 초대 리스트 API 조회 응답 타입
export type SeegeneInvitationListReturnType = ListReturnType & {
  content: SeegeneInvitationUser[]
}

// seegene 초대 리스트 정보 타입
export type SeegeneInvitationUser = {
  usrInvtUid: string
  emlId: string
  usrRolNm: string
  admRolNm?: string
  mdfDt: string
  inviteExpirationYn: string
}

// Seegene 회원 프로젝트 리스트 조회 응답 타입
export type SeegeneUserProjectListReturnType = ListReturnType & {
  content: SeegeneUserProject[]
}

// Seegene 회원 프로젝트 정보 타입
export type SeegeneUserProject = {
  projectNumber: number
  diseaseCategoryName: string
  targetMarket: string
  projectPurposeCode: string
  projectName: string
  processCode: string
  corporationName: string
  endDate: string
  projectRoleCode: string
}

// seegene 가입 완료 리스트 검색 타입
export type SeegeneCompleteSearch = Partial<Pick<ListParamsType, 'size' | 'startDate' | 'endDate' | 'displayEndDate' | 'displayStartDate'>> & {
  userRole?: string
  adminRole?: string
  keyword?: string
}

// seegene 가입 진행 중 리스트 검색 타입
export type SeegeneProgressSearch = Partial<Pick<ListParamsType, 'size' | 'startDate' | 'endDate' | 'displayEndDate' | 'displayStartDate'>> & {
  keyword?: string
}

// seegene 초대 리스트 검색 타입
export type SeegeneInvitaionSearch = Partial<Pick<ListParamsType, 'size' | 'startDate' | 'endDate' | 'displayEndDate' | 'displayStartDate'>> & {
  keyword?: string
}

// seegene 가입 완료 유저 상세 정보 타입
export type SeegeneDetailInfo = {
  userName: string
  emailId: string
  corporationName: string
  departmentName: string
  positionName: string
  memberRegDate: string
  duty?: string
  jobName?: string
  lastAccessDate?: string
  lastAccessIp?: string
  lastAccessCountry?: string
  userRole: {
    roleName: string
    roleId: number
  }
  adminRoles?: {
    roleName: string
    roleId: number
  }[]
  userRoleReq?: string
  adminRoleReqList?: string[]
  registerGb: string
  fileInfoPrvResponse: {
    fileNumber: number
    fileName: string
    displayFileName: string
    fileExtension: string
    filePath: string
    fileSize: number
    storageTypeCode: string
    tableName: string
    preSignedUrl?: string
  }
  userStatusCode: string
}

// seegene 역할 변경요청 타입
export type SeegeneRoleRequestType = {
  userRole: {
    roleName: string
    roleId: number
  }
  adminRoles: {
    roleName: string
    roleId: number
  }[]
  adminRoleReq: string | null
}

/*----------------------------------------NewCo User-------------------------------------*/

// NewCo 가입 완료 리스트 API 조회 응답 타입
export type NewCoCompleteListReturnType = ListReturnType & {
  content: NewCoCompleteUser[]
}

// NewCo 가입 진행 리스트 API 조회 응답 타입
export type NewCoProgressListReturnType = ListReturnType & {
  content: NewCoProgressUser[]
}

// NewCo 초대 리스트 API 조회 응답 타입
export type NewCoInvitationListReturnType = ListReturnType & {
  content: NewCoInvitationUser[]
}

// NewCo 회원 프로젝트 리스트 조회 응답 타입
export type NewCoUserProjectListReturnType = ListReturnType & {
  content: NewCoUserProject[]
}

// NewCo 가입 완료 리스트 정보 타입
export type NewCoCompleteUser = {
  userUid: string
  date: string
  nation: string
  corporationName: string
  fullName: string
  emailId: string
  userRolName: string
  createDate: string
  userStatusCode: string
  corporateLevelCode: string
  roleRequestYn: string
}

// NewCo 가입 진행 중 리스트 정보 타입
export type NewCoProgressUser = {
  date: string
  userUid: string
  nation: string
  corporationName: string
  fullName: string
  emailId: string
  userRolName: string
  createDate: string
  userStatusCode: string
  corporateLevelCode: string
  roleRequestYn: string
  organization: string
  jobTitle: string
}

// NewCo 초대 리스트 정보 타입
export type NewCoInvitationUser = {
  userInvtUid: string
  nation: string
  corporationName: string
  emailId: string
  userRolName: string
  modifyDate: string
  userUid: string
  inviteExpirationYn: string
  inviteRejectYn: string
}

// NewCo 회원 프로젝트 정보 타입
export type NewCoUserProject = {
  projectNumber: number
  diseaseCategoryName: string
  targetMarket: string
  projectPurposeCode: string
  projectName: string
  processCode: string
  corporationName: string
  endDate: string
  projectRoleCode: string
}

// NewCo 가입 완료 유저 상세 정보 타입
export type NewCoDetailInfo = {
  userUid: string
  fullName: string
  emailId: string
  corporationName: string
  organization: string
  jobName: string
  createDate: string
  usrRolId: number
  usrRolName: string
  lastAccessDate: string
  roleRequestYn: string
  roleRequest: number
  jobTile: string
  fileInfoResponse: {
    fileNumber: number
    fileName: string
    displayFileName: string
    fileExtension: string
    filePath: string
    fileSize: number
    storageTypeCode: string
    tableName: string
    preSignedUrl?: string
  }
  userStatusCode: string
}

// newco 가입 완료 리스트 검색 타입
export type NewCoCompleteSearch = Partial<Pick<ListParamsType, 'size' | 'startDate' | 'endDate' | 'displayEndDate' | 'displayStartDate'>> & {
  userRole?: string
  countryCode?: string
  keyword?: string
}

// newco 가입 진행 중 리스트 검색 타입
export type NewCoProgressSearch = Partial<Pick<ListParamsType, 'size' | 'startDate' | 'endDate' | 'displayEndDate' | 'displayStartDate'>> & {
  keyword?: string
}

// newco 초대 리스트 검색 타입
export type NewCoInvitationSearch = Partial<Pick<ListParamsType, 'size' | 'startDate' | 'endDate' | 'displayEndDate' | 'displayStartDate'>> & {
  keyword?: string
}

// 로그인 이력 타입
export type LoginHistoryType = {
  loginDt: string
  ipAddr: string
  cntryNm: string
}
