export interface TermsListType {
  termsCategoryCodeName: string
  termsCategoryCode: string
}

export interface LicenseListType {
  systemName: string
  licenseNumber: number
}

export interface LicenseType {
  licenseNumber: number
  systemName: string
  content: string
  createUid: string
  createDate: string
  modifierUid: string
  modifyDate: string
}

export interface NotificationType {
  notificationCode: string
  notificationCodeName: string
  receiveYn: 'N' | 'Y'
}
