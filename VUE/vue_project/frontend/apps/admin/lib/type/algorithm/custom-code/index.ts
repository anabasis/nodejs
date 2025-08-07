import { ListReturnType, ListParamsType } from 'library/type/common'
import { LibContentType } from '@type/algorithm'

/* 알고리즘 커스텀코드 타입  */

export type CustomParamsType = { size: number }

export type CustomAddParamsType = { name: string; type: string; desc: string }

export type CustomAddVerParamsType = {
  note: string
  src1: string
  src2?: string
  version: string
  releaseDt: string
}

export type latestPartialCodeVerType = {
  id: number
  version: string
  note: string
  releaseDt: string
  src1: string
  src2?: string
  name: string
  value?: string
}

export type CustomCodeContent = {
  id: number
  name: string
  type: string
  desc: string
  createdBy: string
  updatedBy: string
  releaseDt: string
  createdDt: string
  updatedDt: string
  value?: string
  latestPartialCodeVer: latestPartialCodeVerType
}

type CustomCodeType = LibContentType & CustomCodeContent

export type AlogrithmCustomCodeListReturnType = ListReturnType & {
  content: CustomCodeType[]
}

export type AlgoCodeDetailType = CustomCodeContent

export type AlgoCodeVerDetailType = latestPartialCodeVerType

export type AlgoCustomCodeDetailListReturnType = ListReturnType & {
  content: latestPartialCodeVerType[]
}
