export interface ResponseType<ObjectType> {
  content: ObjectType[]
  pageable: {
    sort: { unsorted: boolean; sorted: boolean; empty: boolean }
    pageNumber: number
    pageSize: number
    offset: number
    unpaged: number
    paged: boolean
  }
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
export interface LicenseListType {
  licenceNumber: number
  systemType: string
  systemName: string
  modifyDate: string
}
export interface LicenseType {
  licenceNumber?: number
  systemType: string
  systemName?: string
  contents: string
  modifyDate?: string
}

export interface LicenseFilterType {
  displayStartDate?: string
  displayEndDate?: string
  startDate?: string
  endDate?: string
  systemType?: string
  size?: number
}
