export interface ISearchPage {
  searchKeyword: string
  activeTabIndex: number
  pageNumber: number
  pageSize: number
}

export interface IProject {
  id: number
  targetMarket: string
  dissCatCd: string
  purpose: string
  prjNm: string
  process: string
  corporate: string
  dueDate: string
  projectRoleCode: string
  prjStsCd: string
  prjStsNm: string
}

export interface IRequest {
  reqStsCd: string
  reqStsCdNm: string
  appTpCd: string
  appTpCdNm: string
  reqNm: string
  reqId: string
  prjNum: number
  startDt: string
  prjNm: string
  reqDsignTpCd: string
  favYn: boolean
}
