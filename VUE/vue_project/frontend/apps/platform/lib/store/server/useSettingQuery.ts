import {
  getLanguage,
  getLicenseDetail,
  getLicenseList,
  getTermsList,
  getLanguageList,
  saveLanguage,
  getNotificationList,
  modifyNotification,
} from '@api/setting'
import { useMutation, useQuery } from '@tanstack/react-query'
import { mapKeys } from 'lodash-es'

export const useTermsListData = () => {
  return useQuery({
    queryKey: ['terms'],
    queryFn: () => getTermsList(),
    select: (result) => result.data,
  })
}

export const useLicenseListData = () => {
  return useQuery({
    queryKey: ['setting', 'license'],
    queryFn: () => getLicenseList(),
    select: (result) => {
      return result.data
    },
  })
}

export const useLicenseData = (licenseNumber: string) => {
  return useQuery({
    queryKey: ['setting', 'license', licenseNumber],
    queryFn: () => getLicenseDetail(licenseNumber),
    select: (result) => {
      return result.data
    },
  })
}

export const useLanguageData = () => {
  return useQuery({
    queryKey: ['setting', 'language'],
    queryFn: getLanguage,
    select: (result) => {
      return result.data
    },
  })
}

export const useLanguageListData = () => {
  return useQuery({
    queryKey: ['setting', 'language', 'list'],
    queryFn: getLanguageList,
    select: (result) => {
      return result.data.map(
        (item) => mapKeys(item, (val, key) => (key === 'languageCode' ? 'value' : key === 'languageName' ? 'name' : key)) as { value: string; name: string }
      )
    },
  })
}

export const useModifyLanguageMutation = () => {
  return useMutation({ mutationFn: saveLanguage })
}

export const useNotificationListData = () => {
  return useQuery({
    queryKey: ['setting', 'notification'],
    queryFn: getNotificationList,
    select: (result) => {
      return result.data
    },
  })
}

export const useModifyNotificationMutation = () => {
  return useMutation({ mutationFn: modifyNotification })
}
