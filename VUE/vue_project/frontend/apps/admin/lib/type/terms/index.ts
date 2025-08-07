import { CommonSelectOptionType, ListReturnType, CommonValueType } from 'library/type/common'

/* Terms CommonCode */

type TermsSelectOptnType = CommonSelectOptionType & {
  hidden?: boolean
}

export type TermsCommonCodes = {
  termsCategoryCode?: TermsSelectOptnType[]
  countryCode?: TermsSelectOptnType[]
  langCode?: TermsSelectOptnType[]
}

/* Terms ParamsType */
export type TermsParamsType = {
  periodFromDate?: string
  periodToDate?: string
  termsCategoryCode?: string
  countryCode?: string
  page?: number
  size: number
  displayStartDate?: string
  displayEndDate?: string
}
/* Terms List Type */
type TermsListContentType = {
  termsNum: number
  termsVersionNum: number
  termsCategoryCode: string
  termsCategoryName: string
  countryName: string
  langName: string
  version: string
  applyDate: string
}
/* Terms List Return Type */
export type TermsListReturnType = ListReturnType & {
  content: TermsListContentType[]
}
/* Terms List Select Option Type  */

export type TermsCommonListType = {
  country?: CommonValueType[]
  lang?: CommonValueType[]
}

export type TermsCountryGroup = {
  countryGroupId: string
  countryGroupName: string
}

export type TermsSelectType = {
  countryCode: CommonSelectOptionType[]
  termsCategoryCode: CommonSelectOptionType[]
}

export type TermsConditionsDetailType = {
  langCode: string
  content: string
  id?: string
  langName?: string
  hidden?: boolean
}
/* Terms Add Type */
export type TermsAddParamsType = {
  termsCategoryCode: string
  version: string
  countryCode: string
  releaseDate: string
  termsNum?: number
  conditionsDetail: TermsConditionsDetailType[]
}

/* Terms Detail */

export type TermsDetailType = TermsAddParamsType & {
  termsVersionNum?: number
  termsNum: number
  termsCategoryName?: string
  content?: string
  langName?: string
  countryName?: string
}
