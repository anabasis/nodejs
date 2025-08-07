/* Select Type */

export type CommonDateType = {
  startDate?: string
  endDate?: string
  displayStartDate?: string
  displayEndDate?: string
}

export type CommonSelectOptionType = {
  value: string
  name: string
  sortNum?: number
}

export type CommonSelectCodesType = {
  [key in string]: CommonSelectOptionType[]
}

export type CommonValueType = { name: string; value: string }

/* List Init Param */

export type ListParamsType = CommonDateType & {
  category?: string
  status?: string
  type?: string
  module?: string
  size: number
}

/* List Page Type */

type ResponsePageable = {
  sort: {
    unsorted: boolean
    sorted: boolean
    empty: boolean
  }
  pageNumber: number
  pageSize: number
  offset: number
  paged: boolean
  unpaged: boolean
}

export type ListReturnType = {
  pageable: ResponsePageable
  totalElements: number
  totalPages: number
  last: boolean
  numberOfElements: number
  first: boolean
  size: number
  number: number
  sort: {
    unsorted: boolean
    sorted: boolean
    empty: boolean
  }
  empty: boolean
}

export type FileResType = {
  fileNumber: number
  fileName: string
  displayFileName: string
  fileExtension: string
  filePath: string
  fileSize: number
  storageTypeCode?: string
  tableName?: string
  preSignedUrl?: string
}

export type ToolItem = {
  toolNum: number
  toolName: string
  description: string
  toolLinkUrl: string
  toolsRauncherIcon: FileResType
}

export type NotificationItem = {
  contents: string
  notificationDate: string
  readYn: string
  title: string
  url: string
}

export type NotificationList = {
  Y?: NotificationItem[]
  N?: NotificationItem[]
}

/* OpeneLevel Popup Type */

export type CorporatePartiallyType = {
  corporationNum: number
  corporationName?: string
  corporateLevelCode?: string
  nation?: string
  corporateStatusCode?: string
  memberCount?: number
  createDate?: string
  corporateLevel?: string
}

export type GuideItem = {
  guideNumber: number
  title: string
  guideAttachmentRequestList: FileResType[]
}
