export type SignUpType = {
  emailId: string
  password: string
  userName: string
  organization: string
  jobTitle: string
  joinTypeCode: string
}

export type SignUpTermsAgreementType = {
  emailId?: string
  termsVerNum?: number
  agrYn?: string
}

export type TermsListType = {
  termsCategoryCode: string
  termsVersionId: string
  countryGrpId: string
  termsVersionNum: string
  termsCategoryName: string
  cont: string
  agrYn?: string
  essential: string
  langName?: string
  applyDate: string
}

export type TermsDetailType = {
  termsConditNum: string
  termsVerNum: string
  langCd: string
  cont: string
}

export type HeaderType = {
  title: string
  color: string
  active: boolean
  completed: boolean
}

export type LanguageCodeType = {
  languageCode: string
  nativeName: string
}

export type TermsFilterType = {
  version: string
  termsNumber: number
  languageCode: LanguageCodeType[]
}
