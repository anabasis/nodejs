import { ListReturnType, CommonSelectOptionType, FileResType } from 'library/type/common'

export type LibraryCommonCodeType = {
  openLevel: CommonSelectOptionType[]
}

/* BasicCard Icon Type */

export type IconType = 'complete' | 'edit' | 'delete' | 'drag'

export type IconComponentType = {
  id: string
  component: React.ElementType
  fill: string
  active: boolean
  name: string
}

export type IconGroupPropsType = {
  icons: IconComponentType[]
}

export type IconButtonPropsType = {
  id: string
  componenet: React.ElementType
  fill: string
  active: boolean
  changeIcon: (id: string) => void
}

/* LibraryManual Params Type */

export type LibraryManualType = {
  size: number
  type?: string
  manualsId?: string
  title?: string
  keyword?: string
  startDate?: string
  endDate?: string
  displayStartDate?: string
  displayEndDate?: string
}

/* LibraryManual List Return Type */

export type LibraryManualContentType = {
  librCatNum: number
  titl: string
  manualsListCount: number
  descrp: string
  sortNum: string
  imageFileName: string
  crtrDt: string
  mdfDt: string
  librNum: number
}

export type LibraryManualListContentType = {
  librNum: number
  librCatNum: number
  titl: string
  cont: string
  dowlUseYn: string
  openLvlCd: string
  crtrDt: string
  mdfDt: string
}
export type LibraryManualOrderType = {
  librCatNum: number
  sortNum: number
}

export type LibraryManualReturnType = ListReturnType & {
  content: LibraryManualContentType[]
}
export type LibraryManualListReturnType = ListReturnType & {
  content: LibraryManualListContentType[]
}

/* LibraryManual Add */

export type LibraryManualAddParamsType = {
  titl: string
  descrp: string
  imageFileName: string
  sortNum?: number
}

/* LibraryManual Edit */

export type LibraryManualEdit = {
  manualsId: number
  titl: string
  descrp: string
  imageFileName: string
  sortNum: number
}

/* LibraryManual Detail */
export type LibraryDetailReturnType = {
  librNum: number
  librCatNum: number
  titl: string
  cont: string
  dowlUseYn: string
  openLvlCd: string
  fileInfoResponses: FileResType[]
  crtrDt: string
  mdfDt: string
}
/* LibraryManualList Add */

export type LibraryManualListAddParamsType = Partial<LibraryDetailReturnType> & {
  librCatNum?: number
  titl: string
  cont: string
  dowlUseYn: string
  openLvlCd?: string
  openLevelCode: string
  ptlCorpCode?: { corporationNum: number }[] | number[]
  partiallyOpenRequests?: { corporationNum: number }[] | number[]
  manualsFileNum?: number[]
}

/* LibraryManualList Detail */

export type LibraryManualListDetailType = {
  partiallyOpenRequests?: number[]
  librNum: number
  librCatNum: number
  titl: string
  cont: string
  dowlUseYn: string
  openLvlCd: string
  openLevelCode?: string
  fileInfoResponses: FileResType[]
  crtrDt: string
  mdfDt: string
  ptlCorpCode: number[]
}
