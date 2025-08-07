import { api } from 'library/util'
import { LicenseListType, LicenseType, TermsListType, NotificationType } from '@type/setting/settingType'

export const getTermsList = async () => {
  return await api.get<TermsListType[]>('/account/terms/list')
}

export const getLicenseList = async () => {
  return await api.get<LicenseListType[]>('/account/license/list')
}

export const getLicenseDetail = async (licenseNumber) => {
  return await api.get<LicenseType>(`/account/license/detail?licenseNumber=${licenseNumber}`)
}

export const getLanguage = async () => {
  return await api.get<string>(`/account/language`)
}

export const getLanguageList = async () => {
  return await api.get<
    {
      languageCode: string
      languageName: string
    }[]
  >(`/account/language/list`)
}

export const saveLanguage = async (language: string) => {
  return await api.post(`/account/language/modify`, { languageCode: language })
}

export const getNotificationList = async () => {
  return await api.get<NotificationType[]>(`/account/my-notification-set/info`)
}

export const modifyNotification = async (notificationCode) => {
  return await api.post(`/account/my-notification-set/modify`, { notificationCode })
}
