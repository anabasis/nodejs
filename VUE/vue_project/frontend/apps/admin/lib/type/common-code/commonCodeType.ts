import { ListParamsType, ListReturnType } from 'library/type/common'

// params Type
export type CommonCodeParamsType = Partial<Pick<ListParamsType, 'startDate' | 'endDate' | 'size' | 'displayEndDate' | 'displayStartDate'>> & {
  keywordName?: string
  keyword?: string
}

//commoncode list
export type CommonCodeReturnType = ListReturnType & {
  content: CommonCodeContent[]
}
type CommonCodeContent = {
  codeCount: number
  codeGroupId: string
  codeGroupName: string
  createDate: string
  createUid?: string
  modifierUid?: string
  modifyDate: string
}
//commoncode list
export type CommonCodeItemInformationReturnType = ListReturnType & {
  content: CCItemInformation[]
}

//common code 목록
//component/Board
export type CommonCode = {
  codeCount: number
  codeGroupId: string
  codeGroupName: string
  createDate: string
  createUid: string
  modifierUid?: string
  modifyDate: string
}

//common code 상세
//detail/page
export type CCBasicInformation = {
  code: string
  codeGroupName: string
  createDateTime: string
  editor: string
  creatorUid: string
  modifierUid?: string
  modifyDateTime: string
}

export type CCItemInformation = {
  code: string
  codeGroupId: string
  sortNumber: number
  useYn: string
  codeItemMultiLanguageList: MultiList[]
}

export type MultiList = {
  languageCode: string
  codeName: string
}

//common code 등록
//new/page
export type CommonCodeForm = {
  codeGroupId: string
  codeGroupName: string
  codeItemList: CommonCodeItemListForm[]
}

export type CommonCodeItemListForm = {
  code: string
  sortNumber: number
  codeItemMultiLanguageList: MultiList[]
}

/* common language list */
export type LanguageListType = {
  languageCode: string
  languageName: string
}
