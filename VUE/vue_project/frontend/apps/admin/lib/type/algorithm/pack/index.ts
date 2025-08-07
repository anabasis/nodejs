import { ListReturnType, ListParamsType } from 'library/type/common'
import { LibContentType } from '@type/algorithm'
/* 알고리즘 Pack 타입  */

export type AlgoPackParamsType = {
  size: number
  page?: number
}

export type AlgoPackAddParamsType = {
  type: string
  desc: string
  partialCodeVerId?: number
  libVerIdList?: number[] | { libId: number }[]
  filter: string
  bpn?: number
  dsp?: number
  postproc?: number
  ctcalc?: number
  mudt?: number
  version?: number
  note?: string
  status?: string
}

type AlgoLibMappingListType = []

type PackContentType = {
  id: number
  name: string
  desc: string
  type: string
  algoType: string
  status: string
  createdBy: string
  updatedBy: string
  requestBy: string
  ctType: string
  filter: string
  algoLibMappingList: AlgoLibMappingListType
  releaseDt: string
  createdDt: string
  updatedDt: string
}

export type AlogrithmPackListReturnType = ListReturnType & {
  content: PackContentType[]
}

type PackMappingType = {
  libVer: {
    id: number
    libName: string
    version: string
    note: string
    src: string
    libFilName: string
    libPath: string
    createdBy: string
    releaseDt: string
  }
}
type AlgoLibDataType = {
  libId: number
  libVerId: number
  version: string
}
export type AlgoPartialCodeType = {
  id?: number
  name?: string
  version: string
  libId?: number
  libVerId?: number
  partialCodeId?: string | number
  partialCodeVerId?: string | number
}

type AlgoLibInfoType = {
  DSP: AlgoLibDataType
  BPN: AlgoLibDataType
  CtCalc: AlgoLibDataType
  PostProc: AlgoLibDataType
  MuDT: AlgoLibDataType
  Crosstalk?: AlgoLibDataType
}

export type PackDetailType = {
  id: number
  name: string
  desc: string
  note: string
  type: string
  partialCode: AlgoPartialCodeType
  algoType: AlgoLibInfoType
  status: string
  createdBy: string
  updatedBy: string
  requestBy: string
  requestEmail: string
  ctType: string
  filter: string
  algoLibMappingList: PackMappingType[]
  releaseDt: string
  createdDt: string
  updatedDt: string
}
