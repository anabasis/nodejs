export interface IUserRole {
  id: number
  name: string
  roleLv: string
  corpLv: string
  usrRolCd: string
}

export interface IUserRoleDropDownList {
  levelA?: IUserRole[]
  levelB?: IUserRole[]
}

export interface IAdminRole {
  admRolNum: number
  admRolCd: string
  admRolNm: string
}

export interface IAuthority {
  roleNum: number
  readYn: string
  createYn: string
  updateYn: string
  deleteYn: string
}
