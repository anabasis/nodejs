import { FileResType, ListReturnType } from './common'

export type LibraryManualListContentType = {
  librCatNum: number
  titl: string
  manualsListCount: number
  descrp: string
  sortNum: number
  crtrDt: string
  mdfDt: string
  imageFileName: string
}
export type LibraryManualListReturnType = ListReturnType & {
  content: LibraryManualListContentType[]
}

export type LibraryType = {
  type?: string
}

export type LibraryParamsType = {
  manualsId?: string
  title?: string
  size: number
  keywordTab?: string
  keyword?: string
  startDate?: string
  endDate?: string
  displayStartDate?: string
  displayEndDate?: string
} & LibraryType

export type LibraryDetailReturnType = {
  librNum: number
  librCatNum: number
  dowlUseYn: string
  titl: string
  cont: string
  fileInfoResponses: FileResType[]
  crtrDt: string
  mdfDt: string
  openLvlCd: string
}

export type LibraryListContentType = {
  librNum: number
  librCatNum: string
  titl: string
  cont: string
  dowlUseYn: string
  openLvlCd: string
  crtrDt: string
  mdfDt: string
}

export type LibrarylListReturnType = ListReturnType & {
  content: LibraryListContentType[]
}
