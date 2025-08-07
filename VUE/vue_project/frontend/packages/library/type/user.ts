// useUser userInfo type
export type TypeUserInfo = {
  usrUid: string
  emlId: string
  prflUrl?: string
  usrNm: string
  corpNo: number
  corpNm: string
  orgnNm: string
  jobTitle: string
  jobNm: string
}

// useUser userRole type
export type TypeUserRole = {
  id: number
  name: string
  roleLv: string
  corpLv: string
  usrRolCd: string
}

// useUser adminRole type
export type TypeAdminRole = {
  admRolNum: number
  admRolNm: string
  admRolCd: string
}

// useUser userData
export type TypeUserData = {
  userInfo: TypeUserInfo
  userRole: TypeUserRole
  adminRole: TypeAdminRole[] | []
}

export type MyInfoType = {
  usrUid: string
  emlId: string
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
