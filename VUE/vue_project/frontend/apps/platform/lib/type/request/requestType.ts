export interface RequestType {
  reqStsCd: string
  reqStsCdNm: string
  appTpCd: string
  appTpCdNm: string
  reqNm: string
  reqId: string
  prcsCd: string
  prjNum: number
  startDt: string
  prjNm: string
  reqDsignTpCd: string
  prjRolCd: string
  projectProcRolCode: string
  favYn: boolean
}

export interface PagiabledList<ObjectType> {
  content: ObjectType[]
  pageable: {
    sort: {
      unsorted: boolean
      sorted: boolean
      empty: boolean
    }
    pageSize: number
    pageNumber: number
    offset: number
    paged: boolean
    unpaged: boolean
  }
  last: boolean
  totalPages: number
  totalElements: number
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

export interface RequestFilterType {
  reqStsCd?: string
  appTpCd?: string
  fromDt?: string
  toDt?: string
  keyword?: string
  displayStartDate?: string
  displayEndDate?: string
  size?: number
}
