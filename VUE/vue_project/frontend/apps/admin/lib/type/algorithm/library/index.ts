import { ListReturnType, ListParamsType } from 'library/type/common'
import { LibContentType } from '@type/algorithm'

/* List Type */

export type LibParamsType = { size: number }

export type AlogrithmLibListReturnType = ListReturnType & {
  content: LibContentType[]
}

/* Add Type */
export type LibAddParamsType = {
  name: string
  type?: string
  desc: string
}

export type LibVerAddParamsType = {
  note?: string
  src?: string
  releaseDt: string
}
/* Detail Type */

export type AlgoLibDetailType = LibContentType

export type AlgoLibVersionDetailType = {
  createdBy: string
  id: number
  libFilName: string
  libName: string
  libPath: string
  note: string
  releaseDt: string
  src: string
  version: string
}

export type AlogoLibDetailListReturnType = ListReturnType & {
  content: AlgoLibVersionDetailType[]
}
