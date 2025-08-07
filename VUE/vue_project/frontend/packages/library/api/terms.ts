import { TermsCountryGroupType, TermsFilterItemsTyps, TermsListType, TermsType } from '../type/terms'
import { api } from '../util'

export const getTermsList = async () => {
  return await api.get<TermsListType[]>('/account/terms/list')
}

export const getTermsDetail = async (code: string, filter?: { country: string; version: string; language: string }) => {
  return !!filter
    ? await api.get<TermsType>(
        `/account/terms/detail?categoryCode=${code}${
          filter.country === ''
            ? ''
            : filter.version === ''
            ? `&countryGroupId=${filter.country}`
            : filter.language === ''
            ? `&countryGroupId=${filter.country}&version=${filter.version}`
            : `&countryGroupId=${filter.country}&version=${filter.version}&languageCode=${filter.language}`
        }`
      )
    : await api.get<TermsType>(`/account/terms/detail?categoryCode=${code}`)
}

export const getTermsCountryGroup = async (termsCategory: string) => {
  return await api.get<TermsCountryGroupType[]>(`/account/terms/countryGroup?categoryCd=${termsCategory}`)
}

export const getTermsFilter = async (category: string, countryGroup: string) => {
  return await api.get<TermsFilterItemsTyps[]>(`/account/terms/filter?categoryCd=${category}&countryGroupId=${countryGroup}`)
}
