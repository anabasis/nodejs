import { FileResType } from 'library/type/common'

export interface ITool {
  toolNum: number
  toolName: string
  toolOrder: number
  toolDescription: string
  toolExposure: 'PRV' | 'PTL' | 'PUB'
  toolExposureCorp: { name: string; id: number }[]
  toolUrl: string
  toolRegisterDate: string
  fileInfoResponse: FileResType
}

export interface IToolSearchParam {
  keyword?: string
  startDate?: string
  endDate?: string
  keywordTab?: string
  displayStartDate?: string
  displayEndDate?: string
}

export interface IToolPostFormat {
  toolName: string
  toolDescription: string
  toolExposure: 'PRV' | 'PTL' | 'PUB'
  toolExposureCorporate: number[]
  toolUrl: string
  toolFileNum: number
}

export interface ICorporate {
  corporationNum: number
  corporationName: string
  corporateLevelCode: string
  nation: string
  corporateStatusCode: string
  memberCount: number
  createDate: string
  corporateLevel: string
}

export interface IToolArchiPostData {
  toolOrderDtoLists: { toolNum: number; toolOrder: number }[]
}
