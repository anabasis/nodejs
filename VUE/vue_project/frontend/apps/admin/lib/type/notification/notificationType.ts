import { CommonSelectOptionType, ListParamsType, ListReturnType } from 'library/type/common'

// params Type
export type NotificationParamsType = Partial<Pick<ListParamsType, 'size'>> & {
  keywordName?: string
  keyword?: string
}

//notification List
export type NotificationReturnType = ListReturnType & {
  content: NotificationContent[]
}
export type NotificationContent = {
  id: number
  notificationCode: string
  title: string
  text: string
  landingUrl: string
}

//detail
export type NotificationDetail = {
  id: number
  notificationTypeCode: string
  notificationCode: string
  title: string
  text: string
  landingUrl: string
  notificationMultiLanguage: NotificationMultiLanguage[]
}

export type NotificationMultiLanguage = {
  messageId?: number
  languageCode: string
  text: string
  length?: number
}

//add
export type AddNotification = {
  notificationTypeCode: string
  notificationCode: string
  title: string
  text: string
  landingUrl: string
}

//add
export type EditNotification = {
  notificationTypeCode: string
  notificationCode: string
  title: string
  text: string
  landingUrl: string
}

//commoncode Notification Type Code
export type NotificationCommonCodes = {
  type: CommonSelectOptionType[]
}
