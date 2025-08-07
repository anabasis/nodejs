// /common/login-user/detail
export type UserInfoType = {
  usrUid: string
  emlId: string
  usrNm: string
  corpNo: number
  corpNm: string
  orgnNm: string
  jobTitle?: string
  jobNm?: string
  fileInfoResponse?: FileType
}

type FileType = {
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

export type UserRole = {
  usrRolNum?: string
  length?: number
}
export type UserRequestRole = {
  userRolNum: string
  userRolCd: string
  userRolNm: string
}

//option
export type UserRoleList = {
  corpLv: string
  id: number
  name: string
  roleLv: string
  usrRolCd: string
}

export type AdminRole = {
  admRolNum?: string
  admRolCd: string
  admRolNm?: number
}
export type AdminRequestRole = {
  admRolNum?: string
  admRolCd: string
  admRolNm?: number
}
//option
export type AdminRoleList = {
  admRolNum: number
  admRolCd: string
  admRolNm: string
}

export type LoginLogList = {
  loginDt: string
  ipAddr: string
  cntryNm: string
}

export type MyInfoType = {
  usrUid: string
  emlId: string
  fileInfoResponse?: FileType
  fileInfoPrvResponse?: FileType
  usrNm: string
  cntryNm: string
  corpNm: string
  orgnNm: string
  jobTitl: string
  jobNm?: string
  crtDt: string
  lastAccessDate: string
}

export type EditMyInfoType = {
  usrNm?: string
  orgnNm?: string
  jobTitl?: string
  jobNm?: string
  prflFlNum?: number
}

export type EditUserRoleType = {
  reqNum: string
}
export type EditAdminRoleType = {
  reqNum: string
}

export type MypageMyInfoType = {
  userInformation: {
    usrUid: string
    emlId: string
    fileInfoResponse?: FileType
    usrNm: string
    corpNm: string
    orgnNm: string
    jobTitl: string
    crtDt: string
    lastAccessDate: string
  }
  userRole?: UserRole
  userRoleChangeRequested?: UserRequestRole
  adminRole?: AdminRole[]
  adminRoleChangeRequested?: AdminRequestRole[]
  LoginLogList?: LoginLogList[]
}
