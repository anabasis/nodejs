// common user role type
export type UserRoleCommonType = {
  id: number
  name: string
  roleLv: string
  corpLv: string
  usrRolCd: string
}

// common admin role type
export type AdminRoleCommonType = {
  admRolNum: number
  admRolCd: string
  admRolNm: string
}

// common country code type
export type CountryCodeCommonType = {
  countryCd: string
  korCountryNm: string
  engCountryNm: string
  nativeCountryNm: string
}
