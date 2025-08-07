import { CommonSelectOptionType, ListParamsType, ListReturnType } from 'library/type/common'

// params Type
export type SoftwareParamsType = Partial<Pick<ListParamsType, 'startDate' | 'endDate' | 'size' | 'displayEndDate' | 'displayStartDate'>> & {
  ivdRuoCode?: string
  keywordName?: string
  keyword?: string
}

//commoncode list
export type SoftwareReturnType = ListReturnType & {
  content: SoftwareContent[]
}
type SoftwareContent = {
  softwareName: string
  softwareNumber: number
  softwareRelease: SoftwareRelease
  ivdRuoCode: string
  description: string
  iconFile: FileType
  // iconFile: SoftwareIcon[]
  createDateTime: string
  creatorUid: string
  modifyDateTime: string
  modifierUid: string
}
type SoftwareRelease = {
  softwareReleaseNumber: number
  version?: string
  softwareFile?: FileType
}
type FileType = {
  fileNumber: number
  fileName: string
  displayFileName: string
  fileExtension: string
  filePath: string
  fileSize: number
  storageTypeCode: string
  tableName: string
}

//commoncode (ALL, IVD, RUO)-IVD RUO Division Code
export type SoftwareCommonCodes = {
  type: CommonSelectOptionType[]
}

//detail_history params Type
export type SoftwareHistoryParamsType = Partial<Pick<ListParamsType, 'size'>>

//detail_basic information
export type SoftwareBasicInfo = {
  iconFile: null
  softwareNumber: number
  softwareName: string
  description: string
  ivdRuoCode: string
  createDateTime: string
  creatorUid: string
  modifyDateTime: string
  modifierUid: string
}

//detail_history list
export type SoftwareHistoryReturnType = ListReturnType & {
  content: SoftwareHistoryContent[]
}
export type SoftwareHistoryContent = {
  softwareFileResponse: FileType
  softwareReleaseNumber: number
  version: string
  softwareNumber: number
  releaseNote: string
  createUid: string
  createDate: string
  modifierUid: string
  modifyDate: string
}
