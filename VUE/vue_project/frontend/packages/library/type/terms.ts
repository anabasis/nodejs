export interface TermsListType {
  termsCategoryCodeName: string
  termsCategoryCode: string
}
export interface TermsType {
  termsVer: {
    termsCondit: {
      termsConditionNumber: number
      languageCode: string
      content: string
      createUid: string
      createDate: string
      modifierUid: string
      modifyDate: string
    }
    termsVersionNumber: number
    version: string
    applyDate: string
  }
  termsNumber: number
  termsCategoryCode: string
  countryGroupCd: string
}

export interface TermsCountryGroupType {
  countryGroupName: string
  countryGroupId: string
}

export interface TermsFilterItemsTyps {
  termsNumber: string
  version: string
  languageCode: { languageCode: string; nativeName: string }[]
}
