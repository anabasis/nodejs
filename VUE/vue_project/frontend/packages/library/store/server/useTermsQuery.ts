import { getTermsCountryGroup, getTermsDetail, getTermsFilter, getTermsList } from '../../api/terms'
import { useQuery } from '@tanstack/react-query'
import { mapKeys } from 'lodash-es'

export const useTermsListData = () => {
  return useQuery({
    queryKey: ['terms'],
    queryFn: () => getTermsList(),
    select: (result) => result.data,
  })
}

export const useTermsData = (code: string, filter?: { country: string; version: string; language: string }) => {
  return useQuery({
    queryKey: !!filter ? ['terms', code, `c${filter.country}`, `v${filter.version}`, `l${filter.language}`] : ['setting', 'terms', code],
    queryFn: () => getTermsDetail(code, filter),
    select: (result) => result.data,
  })
}

export const useTermsCountryGroupData = (code: string) => {
  return useQuery({
    queryKey: ['terms', 'countryGroup', code],
    queryFn: () => getTermsCountryGroup(code),
    select: (result): { value: string; name: string }[] =>
      result.data.map(
        (item) =>
          mapKeys(item, (val, key) => (key === 'countryGroupId' ? 'value' : key === 'countryGroupName' ? 'name' : key)) as { value: string; name: string }
      ),
  })
}

export const useTermsFilterItemData = (code: string, filter?: { country: string; version: string; language: string }) => {
  return useQuery({
    queryKey: ['terms', 'termsFilter', code, !!filter ? filter.country : ''],
    queryFn: () => getTermsFilter(code, !!filter ? filter.country : ''),
    select: (result) => result.data,
    enabled: !!filter,
  })
}
